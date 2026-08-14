import type { User } from 'firebase/auth';
import type { FieldValue } from 'firebase/firestore';

export type CustomErrorResponse = {
    message: string;
    code: string;
    originalError: unknown;
    error: boolean;
};

export type UserT = User & {
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
