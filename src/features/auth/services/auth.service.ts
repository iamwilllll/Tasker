import {
    createUserWithEmailAndPassword,
    getRedirectResult,
    sendEmailVerification,
    sendPasswordResetEmail,
    signInWithEmailAndPassword,
    signInWithPopup,
    signInWithRedirect,
    signOut,
    updateProfile,
} from 'firebase/auth';
import { doc, getDoc, serverTimestamp, setDoc } from 'firebase/firestore';
import { auth, db, googleProvider } from '@/config/firebase';
import { AppError, handleError } from '@/errors';

import type { User } from 'firebase/auth';
import type { CustomErrorResponse, UserT } from '@/types';
import type { ForgotPasswordT, LoginT, RegisterT } from '../types';

// ! GLOBAL
function shouldUseRedirect() {
    const hasSmallScreen = window.matchMedia('(max-width: 1024px)').matches;
    const hasTouchPointer = window.matchMedia('(pointer: coarse)').matches;

    return hasSmallScreen || hasTouchPointer;
}

async function saveUser(user: User) {
    const userReference = doc(db, 'users', user.uid);
    const userSnapshot = await getDoc(userReference);

    const commonData = {
        uid: user.uid,
        name: user.displayName ?? '',
        email: user.email ?? '',
        photoURL: user.photoURL ?? '',
        provider: getProvider(user),
        updatedAt: serverTimestamp(),
    };

    if (!userSnapshot.exists()) {
        await setDoc(userReference, {
            ...commonData,
            createdAt: serverTimestamp(),
        });

        return;
    }

    await setDoc(userReference, commonData, {
        merge: true,
    });
}

function getProvider(user: User): UserT['provider'] {
    const provider = user.providerData.find(({ providerId }) => providerId === 'google.com' || providerId === 'password');

    if (!provider) {
        throw new AppError('auth/unsupported-provider');
    }

    if (provider.providerId === 'google.com') return 'google';
    if (provider.providerId === 'password') return 'password';

    throw new AppError('auth/unsupported-provider');
}

export async function updateUser(data: Partial<UserT>): Promise<true | CustomErrorResponse> {
    try {
        if (!auth.currentUser) {
            throw new AppError('auth/user-not-found');
        }

        const user = auth.currentUser;

        if (data.name !== undefined) {
            await updateProfile(user, {
                displayName: data.name,
                photoURL: data.photoURL ?? user.photoURL,
            });
        }

        await setDoc(
            doc(db, 'users', user.uid),
            {
                ...(data.name !== undefined && {
                    name: data.name,
                }),
                ...(data.photoURL !== undefined && {
                    photoURL: data.photoURL,
                }),
                updatedAt: serverTimestamp(),
            },
            {
                merge: true,
            }
        );

        return true;
    } catch (error) {
        return handleError(error);
    }
}

export async function logout(): Promise<true | CustomErrorResponse> {
    try {
        await signOut(auth);
        return true;
    } catch (error) {
        return handleError(error);
    }
}

// ! GOOGLE
export async function handleGoogleRedirect() {
    try {
        const credential = await getRedirectResult(auth);
        if (!credential) return null;

        await saveUser(credential.user);
        return credential.user;
    } catch (error) {
        return handleError(error);
    }
}

export async function loginWithGoogle() {
    try {
        if (shouldUseRedirect()) {
            await signInWithRedirect(auth, googleProvider);
            return null;
        }

        const credential = await signInWithPopup(auth, googleProvider);
        await saveUser(credential.user);
        return credential.user;
    } catch (error) {
        return handleError(error);
    }
}

// ! EMAIL
export async function loginWithEmail(data: LoginT): Promise<User | CustomErrorResponse> {
    try {
        const credential = await signInWithEmailAndPassword(auth, data.email, data.password);

        if (credential.user.emailVerified === false) {
            await logout();
            throw new AppError('auth/email-not-verified');
        }

        return credential.user;
    } catch (error) {
        return handleError(error);
    }
}

export async function registerWithEmail(data: RegisterT): Promise<User | CustomErrorResponse> {
    try {
        if (data.password !== data.confirmPassword) {
            throw new AppError('Passwords do not match');
        }

        const credential = await createUserWithEmailAndPassword(auth, data.email, data.password);

        if (data.name) {
            await updateProfile(credential.user, {
                displayName: data.name,
            });
        }
        await saveUser(credential.user);
        await sendEmailVerification(credential.user);
        await signOut(auth);

        return credential.user;
    } catch (error) {
        return handleError(error);
    }
}

export async function forgotPasswordWithEmail({ email }: ForgotPasswordT): Promise<true | CustomErrorResponse> {
    try {
        await sendPasswordResetEmail(auth, email);
        return true;
    } catch (error) {
        return handleError(error);
    }
}
