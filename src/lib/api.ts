/**
 * MatchLink API Client
 * Handles all communication with the backend API
 */

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

// Token management
const TOKEN_KEY = 'matchlink_token';

export const getToken = (): string | null => {
    if (typeof window !== 'undefined') {
        return localStorage.getItem(TOKEN_KEY);
    }
    return null;
};

export const setToken = (token: string): void => {
    if (typeof window !== 'undefined') {
        localStorage.setItem(TOKEN_KEY, token);
    }
};

export const removeToken = (): void => {
    if (typeof window !== 'undefined') {
        localStorage.removeItem(TOKEN_KEY);
    }
};

// API Response types
interface ApiResponse<T> {
    success: boolean;
    data?: T;
    message?: string;
    count?: number;
}

// User types
export interface User {
    id: string;
    email: string;
    displayName: string;
    token?: string;
    hasProfile?: boolean;
}

// Profile types
export interface Photo {
    id: string;
    url: string;
    hint: string;
}

export interface Location {
    city: string;
    state: string;
    country: string;
}

export interface ReligionInfo {
    religion: string;
    caste: string;
}

export interface FamilyDetails {
    bio: string;
}

export interface PartnerPreferences {
    ageRange: string;
    heightRange: string;
    bio: string;
    interests: string[];
}

export interface Profile {
    id: string;
    _id?: string;
    userId: string;
    name: string;
    age: number;
    gender: 'Male' | 'Female' | 'Other';
    location: Location;
    photos: Photo[];
    bio: string;
    interests: string[];
    occupation: string;
    education: string;
    height: string;
    religionInfo: ReligionInfo;
    familyDetails: FamilyDetails;
    partnerPreferences: PartnerPreferences;
    createdAt: string;
    updatedAt: string;
}

// API Error class
export class ApiError extends Error {
    constructor(public statusCode: number, message: string) {
        super(message);
        this.name = 'ApiError';
    }
}

// Base fetch wrapper
async function fetchApi<T>(
    endpoint: string,
    options: RequestInit = {}
): Promise<T> {
    const token = getToken();

    const headers: HeadersInit = {
        'Content-Type': 'application/json',
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
        ...options.headers,
    };

    const response = await fetch(`${API_URL}${endpoint}`, {
        ...options,
        headers,
    });

    const data = await response.json();

    if (!response.ok) {
        throw new ApiError(
            response.status,
            data.message || 'An error occurred'
        );
    }

    return data;
}

// ==================== AUTH API ====================

export const authApi = {
    async register(email: string, password: string, displayName: string): Promise<User> {
        const response = await fetchApi<ApiResponse<User>>('/api/auth/register', {
            method: 'POST',
            body: JSON.stringify({ email, password, displayName }),
        });

        if (response.data?.token) {
            setToken(response.data.token);
        }

        return response.data!;
    },

    async login(email: string, password: string): Promise<User> {
        const response = await fetchApi<ApiResponse<User>>('/api/auth/login', {
            method: 'POST',
            body: JSON.stringify({ email, password }),
        });

        if (response.data?.token) {
            setToken(response.data.token);
        }

        return response.data!;
    },

    async getMe(): Promise<User & { profile: Profile | null }> {
        const response = await fetchApi<ApiResponse<User & { profile: Profile | null }>>('/api/auth/me');
        return response.data!;
    },

    logout(): void {
        removeToken();
    },
};

// ==================== PROFILES API ====================

export interface ProfileFilters {
    gender?: string;
    minAge?: number;
    maxAge?: number;
    city?: string;
}

export const profilesApi = {
    async getAll(filters?: ProfileFilters): Promise<Profile[]> {
        const params = new URLSearchParams();
        if (filters?.gender) params.append('gender', filters.gender);
        if (filters?.minAge) params.append('minAge', filters.minAge.toString());
        if (filters?.maxAge) params.append('maxAge', filters.maxAge.toString());
        if (filters?.city) params.append('city', filters.city);

        const queryString = params.toString();
        const endpoint = `/api/profiles${queryString ? `?${queryString}` : ''}`;

        const response = await fetchApi<ApiResponse<Profile[]>>(endpoint);
        return response.data || [];
    },

    async getMyProfile(): Promise<Profile | null> {
        try {
            const response = await fetchApi<ApiResponse<Profile>>('/api/profiles/me');
            return response.data || null;
        } catch (error) {
            if (error instanceof ApiError && error.statusCode === 404) {
                return null;
            }
            throw error;
        }
    },

    async getById(id: string): Promise<Profile> {
        const response = await fetchApi<ApiResponse<Profile>>(`/api/profiles/${id}`);
        return response.data!;
    },

    async create(profileData: Partial<Profile>): Promise<Profile> {
        const response = await fetchApi<ApiResponse<Profile>>('/api/profiles', {
            method: 'POST',
            body: JSON.stringify(profileData),
        });
        return response.data!;
    },

    async update(profileData: Partial<Profile>): Promise<Profile> {
        const response = await fetchApi<ApiResponse<Profile>>('/api/profiles/me', {
            method: 'PUT',
            body: JSON.stringify(profileData),
        });
        return response.data!;
    },

    async delete(): Promise<void> {
        await fetchApi<ApiResponse<void>>('/api/profiles/me', {
            method: 'DELETE',
        });
    },
};

// ==================== HEALTH CHECK ====================

export async function checkApiHealth(): Promise<boolean> {
    try {
        const response = await fetch(`${API_URL}/health`);
        return response.ok;
    } catch {
        return false;
    }
}

export default {
    auth: authApi,
    profiles: profilesApi,
    checkHealth: checkApiHealth,
};
