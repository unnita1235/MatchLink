export type Profile = {
  id: string;
  name: string;
  age: number;
  gender: 'Male' | 'Female' | 'Other';
  location: {
    city: string;
    state: string;
    country: string;
  };
  photos: { id: string; url: string; hint: string }[];
  bio: string;
  interests: string[];
  occupation: string;
  education: string;
  height: string; // e.g., "5'10\""
  religionInfo: {
    religion: string;
    caste: string;
  };
  familyDetails: {
    bio: string;
  };
  partnerPreferences: {
    ageRange: string;
    heightRange: string;
    bio: string;
    interests: string[];
  };
};
