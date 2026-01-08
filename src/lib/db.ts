
import { db } from "@/lib/firebase";
import {
    doc,
    getDoc,
    setDoc,
    updateDoc,
    collection,
    getDocs,
    query,
    where,
    DocumentData
} from "firebase/firestore";
import type { Profile } from "@/lib/types";

// User Helpers

export async function getUserProfile(userId: string): Promise<Profile | null> {
    try {
        if (!db) return null;
        const docRef = doc(db, "profiles", userId);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            return docSnap.data() as Profile;
        } else {
            return null;
        }
    } catch (error) {
        throw error;
    }
}

export async function createUserProfile(userId: string, profileData: Partial<Profile>) {
    try {
        await setDoc(doc(db, "profiles", userId), {
            ...profileData,
            id: userId,
            createdAt: new Date(),
            updatedAt: new Date(),
        }, { merge: true });
    } catch (error) {
        throw error;
    }
}

export async function updateUserProfile(userId: string, data: Partial<Profile>) {
    try {
        const docRef = doc(db, "profiles", userId);
        await updateDoc(docRef, {
            ...data,
            updatedAt: new Date(),
        });
    } catch (error) {
        throw error;
    }
}

export async function getAllProfiles(excludeUserId?: string): Promise<Profile[]> {
    try {
        // In a real app with many users, you wouldn't fetch ALL. 
        // You'd paginate or filter. For now, this mimics the mock data behavior.
        const querySnapshot = await getDocs(collection(db, "profiles"));
        const profiles: Profile[] = [];

        querySnapshot.forEach((doc) => {
            const data = doc.data() as Profile;
            if (excludeUserId && data.id === excludeUserId) {
                return;
            }
            profiles.push(data);
        });

        return profiles;
    } catch (error) {
        throw error;
    }
}
