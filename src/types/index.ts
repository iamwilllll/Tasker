import type { User } from 'firebase/auth';
import type { FieldValue } from 'firebase/firestore';

export type CustomErrorResponse = {
    message: string;
    code: string;
    originalError: unknown;
    error: boolean;
};

export type UserT = {
    uid: User['uid'];
    name: string;
    email: string;
    photoURL: User['photoURL'];
    provider: 'google' | 'password';

    createdAt: FieldValue;
    updatedAt: FieldValue;

    preferences?: {
        theme?: 'system' | 'light' | 'dark' | 'shiny';
        language?: 'en' | 'es';
        notifications?: boolean;
    };
};

export type Theme = 'system' | 'light' | 'dark' | 'shiny';
export type Language = 'en';

export interface UserPreferences {
    theme?: Theme;
    language?: Language;
}

export interface AppUser extends User {
    preferences?: UserPreferences;
}
