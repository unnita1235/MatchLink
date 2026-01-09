import express, { Request, Response } from 'express';
import Profile from '../models/Profile';
import { protect, AuthRequest } from '../middleware/auth';

const router = express.Router();

// @route   GET /api/profiles
// @desc    Get all profiles (for discovery)
// @access  Private
router.get('/', protect, async (req: AuthRequest, res: Response): Promise<void> => {
    try {
        const userId = req.user!._id;

        // Get query params for filtering
        const { gender, minAge, maxAge, city } = req.query;

        // Build filter (exclude current user's profile)
        const filter: Record<string, unknown> = { userId: { $ne: userId } };

        if (gender) filter.gender = gender;
        if (minAge || maxAge) {
            filter.age = {};
            if (minAge) (filter.age as Record<string, number>).$gte = parseInt(minAge as string);
            if (maxAge) (filter.age as Record<string, number>).$lte = parseInt(maxAge as string);
        }
        if (city) filter['location.city'] = new RegExp(city as string, 'i');

        const profiles = await Profile.find(filter)
            .sort({ createdAt: -1 })
            .limit(50);

        res.json({
            success: true,
            count: profiles.length,
            data: profiles,
        });
    } catch (error) {
        console.error('Get profiles error:', error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
});

// @route   GET /api/profiles/me
// @desc    Get current user's profile
// @access  Private
router.get('/me', protect, async (req: AuthRequest, res: Response): Promise<void> => {
    try {
        const profile = await Profile.findOne({ userId: req.user!._id });

        if (!profile) {
            res.status(404).json({ success: false, message: 'Profile not found' });
            return;
        }

        res.json({ success: true, data: profile });
    } catch (error) {
        console.error('Get my profile error:', error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
});

// @route   GET /api/profiles/:id
// @desc    Get profile by ID
// @access  Private
router.get('/:id', protect, async (req: Request, res: Response): Promise<void> => {
    try {
        const profile = await Profile.findById(req.params.id);

        if (!profile) {
            res.status(404).json({ success: false, message: 'Profile not found' });
            return;
        }

        res.json({ success: true, data: profile });
    } catch (error) {
        console.error('Get profile error:', error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
});

// @route   POST /api/profiles
// @desc    Create profile
// @access  Private
router.post('/', protect, async (req: AuthRequest, res: Response): Promise<void> => {
    try {
        const userId = req.user!._id;

        // Check if profile already exists
        const existingProfile = await Profile.findOne({ userId });
        if (existingProfile) {
            res.status(400).json({ success: false, message: 'Profile already exists' });
            return;
        }

        // Create profile
        const profile = await Profile.create({
            ...req.body,
            userId,
        });

        res.status(201).json({ success: true, data: profile });
    } catch (error: unknown) {
        console.error('Create profile error:', error);
        if (error instanceof Error && error.name === 'ValidationError') {
            res.status(400).json({ success: false, message: error.message });
            return;
        }
        res.status(500).json({ success: false, message: 'Server error' });
    }
});

// @route   PUT /api/profiles/me
// @desc    Update current user's profile
// @access  Private
router.put('/me', protect, async (req: AuthRequest, res: Response): Promise<void> => {
    try {
        const userId = req.user!._id;

        const profile = await Profile.findOneAndUpdate(
            { userId },
            { ...req.body, updatedAt: new Date() },
            { new: true, runValidators: true }
        );

        if (!profile) {
            res.status(404).json({ success: false, message: 'Profile not found' });
            return;
        }

        res.json({ success: true, data: profile });
    } catch (error: unknown) {
        console.error('Update profile error:', error);
        if (error instanceof Error && error.name === 'ValidationError') {
            res.status(400).json({ success: false, message: error.message });
            return;
        }
        res.status(500).json({ success: false, message: 'Server error' });
    }
});

// @route   DELETE /api/profiles/me
// @desc    Delete current user's profile
// @access  Private
router.delete('/me', protect, async (req: AuthRequest, res: Response): Promise<void> => {
    try {
        const profile = await Profile.findOneAndDelete({ userId: req.user!._id });

        if (!profile) {
            res.status(404).json({ success: false, message: 'Profile not found' });
            return;
        }

        res.json({ success: true, message: 'Profile deleted' });
    } catch (error) {
        console.error('Delete profile error:', error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
});

export default router;
