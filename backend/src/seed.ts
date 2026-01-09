import dotenv from 'dotenv';
import mongoose from 'mongoose';
import connectDB from './config/db';
import User from './models/User';
import Profile from './models/Profile';

dotenv.config();

// Sample profiles data
const sampleProfiles = [
    {
        email: 'priya@example.com',
        password: 'password123',
        displayName: 'Priya Patel',
        profile: {
            name: 'Priya Patel',
            age: 28,
            gender: 'Female' as const,
            location: { city: 'San Francisco', state: 'CA', country: 'USA' },
            photos: [
                { id: '1', url: 'https://picsum.photos/seed/prof1/400/400', hint: 'woman portrait' },
            ],
            bio: 'Software engineer with a love for the outdoors. I enjoy hiking, trying new food trucks, and weekend trips.',
            interests: ['Hiking', 'Cooking', 'Technology', 'Travel', 'Live Music'],
            occupation: 'Software Engineer',
            education: 'Masters in Computer Science',
            height: "5'6\"",
            religionInfo: { religion: 'Hindu', caste: 'Patel' },
            familyDetails: { bio: 'From a close-knit family based in Mumbai.' },
            partnerPreferences: {
                ageRange: '28-35',
                heightRange: "5'9\" - 6'2\"",
                bio: 'Seeking an ambitious and caring partner.',
                interests: ['Travel', 'Technology', 'Outdoors'],
            },
        },
    },
    {
        email: 'rohan@example.com',
        password: 'password123',
        displayName: 'Rohan Sharma',
        profile: {
            name: 'Rohan Sharma',
            age: 32,
            gender: 'Male' as const,
            location: { city: 'New York', state: 'NY', country: 'USA' },
            photos: [
                { id: '2', url: 'https://picsum.photos/seed/prof2/400/400', hint: 'man portrait' },
            ],
            bio: 'Investment banker by day, musician by night. I find balance through jazz music.',
            interests: ['Jazz Music', 'Finance', 'Reading', 'Museums', 'Fine Dining'],
            occupation: 'Investment Banker',
            education: 'MBA in Finance',
            height: "6'0\"",
            religionInfo: { religion: 'Hindu', caste: 'Brahmin' },
            familyDetails: { bio: 'My family lives in Delhi. Father is a doctor.' },
            partnerPreferences: {
                ageRange: '27-33',
                heightRange: "5'5\" - 5'10\"",
                bio: 'Looking for an intelligent, independent woman.',
                interests: ['Arts', 'Culture', 'Reading'],
            },
        },
    },
    {
        email: 'meera@example.com',
        password: 'password123',
        displayName: 'Meera Iyer',
        profile: {
            name: 'Meera Iyer',
            age: 29,
            gender: 'Female' as const,
            location: { city: 'Austin', state: 'TX', country: 'USA' },
            photos: [
                { id: '5', url: 'https://picsum.photos/seed/prof5/400/400', hint: 'woman portrait' },
            ],
            bio: 'Doctor in residency. Life is busy, but I make time for live music and my golden retriever.',
            interests: ['Medicine', 'Live Music', 'Paddleboarding', 'Dogs', 'Brunch'],
            occupation: 'Doctor',
            education: 'MD',
            height: "5'7\"",
            religionInfo: { religion: 'Hindu', caste: 'Iyer' },
            familyDetails: { bio: 'Born and raised in Chennai.' },
            partnerPreferences: {
                ageRange: '29-36',
                heightRange: "5'10\"+",
                bio: 'Seeking a supportive and understanding partner.',
                interests: ['Outdoors', 'Music', 'Dogs'],
            },
        },
    },
];

async function seed() {
    try {
        await connectDB();
        console.log('Connected to MongoDB');

        // Clear existing data
        await User.deleteMany({});
        await Profile.deleteMany({});
        console.log('Cleared existing data');

        // Create users and profiles
        for (const data of sampleProfiles) {
            const user = await User.create({
                email: data.email,
                password: data.password,
                displayName: data.displayName,
            });

            await Profile.create({
                ...data.profile,
                userId: user._id,
            });

            console.log(`Created user: ${data.email}`);
        }

        console.log('✅ Seed completed successfully!');
        console.log('\nTest credentials:');
        console.log('  Email: priya@example.com');
        console.log('  Password: password123');

        await mongoose.connection.close();
        process.exit(0);
    } catch (error) {
        console.error('Seed error:', error);
        process.exit(1);
    }
}

seed();
