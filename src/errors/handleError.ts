import { FirebaseError } from 'firebase/app';
import { type CustomErrorResponse } from '@/types';
import { AppError } from './AppError';

export const handleError = (error: unknown): CustomErrorResponse => {
    let message = 'An unexpected error occurred. Please try again.';
    let code = 'UNKNOWN_ERROR';

    if (error instanceof FirebaseError || error instanceof AppError) {
        code = error.code;
        switch (error.code) {
            case 'auth/email-already-in-use':
                message = 'This email address is already registered.';
                break;
            case 'auth/invalid-email':
                message = 'The email address format is invalid.';
                break;
            case 'auth/weak-password':
                message = 'The password is too weak. It must be at least 6 characters.';
                break;
            case 'auth/user-not-found':
            case 'auth/wrong-password':
                message = 'Incorrect email or password.';
                break;
            case 'auth/popup-closed-by-user':
                message = 'The authentication process was cancelled by the user.';
                break;
            case 'permission-denied':
                message = 'You do not have permission to perform this action.';
                break;
            case 'not-found':
                message = 'The requested resource was not found.';
                break;
            case 'auth/invalid-credential':
                message = 'Invalid credentials. Please try again.';
                break;
            case 'auth/too-many-requests':
                message = 'Too many requests. Please try again later.';
                break;
            case 'auth/email-not-verified':
                message = 'Please verify your email address before logging in, please check your inbox.';
                break;
            default:
                message = `Firebase service error: ${error.message}`;
        }
    } else if (error instanceof Error) {
        code = error.name;
        if (error.name === 'QuotaExceededError') {
            message = 'Local storage is full. Data could not be saved.';
        } else if (error.message.includes('IndexedDB') || error.name.includes('Database')) {
            message = 'Error accessing the local database.';
        } else {
            message = error.message;
        }
    }

    console.error(`[ErrorHandler] Code: ${code} | Message: ${message}`, error);

    return {
        message,
        code,
        originalError: error,
        error: true,
    };
};
