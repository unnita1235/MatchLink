import express, { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/User';
import Profile from '../models/Profile';
import { protect, AuthRequest } from '../middleware/auth';

const router = express.Router();

// Generate JWT Token
const generateToken = (id: string): string => {
    return jwt.sign({ id }, process.env.JWT_SECRET!, {
        expiresIn: '30d',
    });
};

// @route   POST /api/auth/register
// @desc    Register a new user
// @access  Public
router.post('/register', async (req: Request, res: Response): Promise<void> => {
    try {
        const { email, password, displayName } = req.body;

        // Validation
        if (!email || !password || !displayName) {
            res.status(400).json({ success: false, message: 'Please provide all required fields' });
            return;
        }

        // Check if user exists
        const userExists = await User.findOne({ email });
        if (userExists) {
            res.status(400).json({ success: false, message: 'User already exists' });
            return;
        }

        // Create user
        const user = await User.create({ email, password, displayName });

        // Return token
        res.status(201).json({
            success: true,
            data: {
                id: user._id,
                email: user.email,
                displayName: user.displayName,
                token: generateToken(user._id.toString()),
            },
        });
    } catch (error) {
        console.error('Register error:', error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
});

// @route   POST /api/auth/login
// @desc    Login user
// @access  Public
router.post('/login', async (req: Request, res: Response): Promise<void> => {
    try {
        const { email, password } = req.body;

        // Validation
        if (!email || !password) {
            res.status(400).json({ success: false, message: 'Please provide email and password' });
            return;
        }

        // Find user and include password
        const user = await User.findOne({ email }).select('+password');
        if (!user) {
            res.status(401).json({ success: false, message: 'Invalid credentials' });
            return;
        }

        // Check password
        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            res.status(401).json({ success: false, message: 'Invalid credentials' });
            return;
        }

        // Get user's profile if exists
        const profile = await Profile.findOne({ userId: user._id });

        res.json({
            success: true,
            data: {
                id: user._id,
                email: user.email,
                displayName: user.displayName,
                token: generateToken(user._id.toString()),
                hasProfile: !!profile,
            },
        });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
});

// @route   GET /api/auth/me
// @desc    Get current logged in user
// @access  Private
router.get('/me', protect, async (req: AuthRequest, res: Response): Promise<void> => {
    try {
        const user = req.user!;
        const profile = await Profile.findOne({ userId: user._id });

        res.json({
            success: true,
            data: {
                id: user._id,
                email: user.email,
                displayName: user.displayName,
                profile: profile || null,
            },
        });
    } catch (error) {
        console.error('Get me error:', error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
});

export default router;
