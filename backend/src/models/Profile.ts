import mongoose, { Document, Schema } from 'mongoose';

export interface IPhoto {
    id: string;
    url: string;
    hint: string;
}

export interface ILocation {
    city: string;
    state: string;
    country: string;
}

export interface IReligionInfo {
    religion: string;
    caste: string;
}

export interface IFamilyDetails {
    bio: string;
}

export interface IPartnerPreferences {
    ageRange: string;
    heightRange: string;
    bio: string;
    interests: string[];
}

export interface IProfile extends Document {
    _id: mongoose.Types.ObjectId;
    userId: mongoose.Types.ObjectId;
    name: string;
    age: number;
    gender: 'Male' | 'Female' | 'Other';
    location: ILocation;
    photos: IPhoto[];
    bio: string;
    interests: string[];
    occupation: string;
    education: string;
    height: string;
    religionInfo: IReligionInfo;
    familyDetails: IFamilyDetails;
    partnerPreferences: IPartnerPreferences;
    createdAt: Date;
    updatedAt: Date;
}

const photoSchema = new Schema<IPhoto>({
    id: { type: String, required: true },
    url: { type: String, required: true },
    hint: { type: String, default: '' },
}, { _id: false });

const locationSchema = new Schema<ILocation>({
    city: { type: String, required: true },
    state: { type: String, required: true },
    country: { type: String, required: true },
}, { _id: false });

const religionInfoSchema = new Schema<IReligionInfo>({
    religion: { type: String, default: '' },
    caste: { type: String, default: '' },
}, { _id: false });

const familyDetailsSchema = new Schema<IFamilyDetails>({
    bio: { type: String, default: '' },
}, { _id: false });

const partnerPreferencesSchema = new Schema<IPartnerPreferences>({
    ageRange: { type: String, default: '' },
    heightRange: { type: String, default: '' },
    bio: { type: String, default: '' },
    interests: [{ type: String }],
}, { _id: false });

const profileSchema = new Schema<IProfile>(
    {
        userId: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true,
            unique: true,
        },
        name: {
            type: String,
            required: [true, 'Name is required'],
            trim: true,
        },
        age: {
            type: Number,
            required: [true, 'Age is required'],
            min: [18, 'Must be at least 18 years old'],
        },
        gender: {
            type: String,
            enum: ['Male', 'Female', 'Other'],
            required: [true, 'Gender is required'],
        },
        location: {
            type: locationSchema,
            required: true,
        },
        photos: [photoSchema],
        bio: {
            type: String,
            default: '',
            maxlength: [1000, 'Bio cannot exceed 1000 characters'],
        },
        interests: [{ type: String }],
        occupation: { type: String, default: '' },
        education: { type: String, default: '' },
        height: { type: String, default: '' },
        religionInfo: {
            type: religionInfoSchema,
            default: () => ({ religion: '', caste: '' }),
        },
        familyDetails: {
            type: familyDetailsSchema,
            default: () => ({ bio: '' }),
        },
        partnerPreferences: {
            type: partnerPreferencesSchema,
            default: () => ({ ageRange: '', heightRange: '', bio: '', interests: [] }),
        },
    },
    {
        timestamps: true,
        toJSON: {
            virtuals: true,
            transform: (_, ret: Record<string, unknown>) => {
                ret.id = (ret._id as mongoose.Types.ObjectId).toString();
                delete ret.__v;
                return ret;
            },
        },
    }
);

// Index for faster queries
profileSchema.index({ 'location.city': 1 });
profileSchema.index({ age: 1 });
profileSchema.index({ gender: 1 });

export default mongoose.model<IProfile>('Profile', profileSchema);
