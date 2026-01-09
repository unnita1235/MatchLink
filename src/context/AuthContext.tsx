"use client";

import React, { createContext, useContext, useEffect, useState, useCallback } from "react";
import { authApi, getToken, removeToken, User, Profile } from "@/lib/api";

interface AuthUser {
    id: string;
    email: string;
    displayName: string;
    profile?: Profile | null;
}

interface AuthContextType {
    user: AuthUser | null;
    loading: boolean;
    isAuthenticated: boolean;
    login: (email: string, password: string) => Promise<void>;
    register: (email: string, password: string, displayName: string) => Promise<void>;
    signOut: () => Promise<void>;
    refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<AuthUser | null>(null);
    const [loading, setLoading] = useState(true);

    const refreshUser = useCallback(async () => {
        try {
            const token = getToken();
            if (!token) {
                setUser(null);
                return;
            }

            const userData = await authApi.getMe();
            setUser({
                id: userData.id,
                email: userData.email,
                displayName: userData.displayName,
                profile: userData.profile,
            });
        } catch (error) {
            console.error("Failed to refresh user:", error);
            removeToken();
            setUser(null);
        }
    }, []);

    useEffect(() => {
        const initAuth = async () => {
            const token = getToken();

            if (!token) {
                // Demo mode - create a demo user for testing
                if (process.env.NODE_ENV === 'development' || !process.env.NEXT_PUBLIC_API_URL) {
                    console.info("Running in demo mode - no backend connected");
                    setUser({
                        id: 'demo-user',
                        email: 'demo@matchlink.com',
                        displayName: 'Demo User',
                        profile: null,
                    });
                }
                setLoading(false);
                return;
            }

            try {
                await refreshUser();
            } catch (error) {
                console.error("Auth initialization error:", error);
            } finally {
                setLoading(false);
            }
        };

        initAuth();
    }, [refreshUser]);

    const login = async (email: string, password: string) => {
        const userData = await authApi.login(email, password);
        setUser({
            id: userData.id,
            email: userData.email,
            displayName: userData.displayName,
            profile: null, // Will be loaded separately
        });
    };

    const register = async (email: string, password: string, displayName: string) => {
        const userData = await authApi.register(email, password, displayName);
        setUser({
            id: userData.id,
            email: userData.email,
            displayName: userData.displayName,
            profile: null,
        });
    };

    const signOut = async () => {
        authApi.logout();
        setUser(null);
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                loading,
                isAuthenticated: !!user,
                login,
                register,
                signOut,
                refreshUser,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
}
