/**
 * Database operations layer
 * Uses backend API when available, falls back to Firebase/mock data
 */

import { profilesApi, getToken, Profile as ApiProfile } from '@/lib/api';
import { db } from '@/lib/firebase';
import {
    doc,
    getDoc,
    setDoc,
    updateDoc,
    collection,
    getDocs,
} from 'firebase/firestore';
import type { Profile } from '@/lib/types';

// Check if we're connected to the backend
const hasBackendConnection = (): boolean => {
    return !!getToken() && !!process.env.NEXT_PUBLIC_API_URL;
};

// User Helpers

export async function getUserProfile(userId: string): Promise<Profile | null> {
    try {
        // Try backend API first if authenticated
        if (hasBackendConnection()) {
            const profile = await profilesApi.getMyProfile();
            if (profile) {
                return convertApiProfileToLocal(profile);
            }
        }

        // Fallback to Firebase
        if (!db) return null;
        const docRef = doc(db, 'profiles', userId);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            return docSnap.data() as Profile;
        }
        return null;
    } catch (error) {
        console.error('Error getting user profile:', error);
        return null;
    }
}

export async function createUserProfile(userId: string, profileData: Partial<Profile>) {
    try {
        // Try backend API first if authenticated
        if (hasBackendConnection()) {
            await profilesApi.create(profileData as Partial<ApiProfile>);
            return;
        }

        // Fallback to Firebase
        if (!db) throw new Error('Database not available');
        await setDoc(doc(db, 'profiles', userId), {
            ...profileData,
            id: userId,
            createdAt: new Date(),
            updatedAt: new Date(),
        }, { merge: true });
    } catch (error) {
        console.error('Error creating user profile:', error);
        throw error;
    }
}

export async function updateUserProfile(userId: string, data: Partial<Profile>) {
    try {
        // Try backend API first if authenticated
        if (hasBackendConnection()) {
            await profilesApi.update(data as Partial<ApiProfile>);
            return;
        }

        // Fallback to Firebase
        if (!db) throw new Error('Database not available');
        const docRef = doc(db, 'profiles', userId);
        await updateDoc(docRef, {
            ...data,
            updatedAt: new Date(),
        });
    } catch (error) {
        console.error('Error updating user profile:', error);
        throw error;
    }
}

export async function getAllProfiles(excludeUserId?: string): Promise<Profile[]> {
    try {
        // Try backend API first if authenticated
        if (hasBackendConnection()) {
            const profiles = await profilesApi.getAll();
            return profiles.map(convertApiProfileToLocal);
        }

        // Fallback to Firebase
        if (!db) return [];
        const querySnapshot = await getDocs(collection(db, 'profiles'));
        const profiles: Profile[] = [];

        querySnapshot.forEach((docSnapshot) => {
            const data = docSnapshot.data() as Profile;
            if (excludeUserId && data.id === excludeUserId) {
                return;
            }
            profiles.push(data);
        });

        return profiles;
    } catch (error) {
        console.error('Error getting all profiles:', error);
        return [];
    }
}

// Helper to convert API profile format to local format
function convertApiProfileToLocal(apiProfile: ApiProfile): Profile {
    return {
        id: apiProfile.id || apiProfile._id || '',
        name: apiProfile.name,
        age: apiProfile.age,
        gender: apiProfile.gender,
        location: apiProfile.location,
        photos: apiProfile.photos,
        bio: apiProfile.bio,
        interests: apiProfile.interests,
        occupation: apiProfile.occupation,
        education: apiProfile.education,
        height: apiProfile.height,
        religionInfo: apiProfile.religionInfo,
        familyDetails: apiProfile.familyDetails,
        partnerPreferences: apiProfile.partnerPreferences,
    };
}
