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
import type { ForgotPasswordT, LoginT, RegisterT, UpdateUserT } from '../types';

async function saveUser(user: User) {
    const userReference = doc(db, 'users', user.uid);
    const userSnapshot = await getDoc(userReference);

    const commonData: UserT = {
        uid: user.uid,
        name: user.displayName ?? '',
        email: user.email ?? '',
        photoURL: user.photoURL ?? '',
        provider: 'google',
        updatedAt: serverTimestamp(),
        createdAt: serverTimestamp(),
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

function shouldUseRedirect() {
    const hasSmallScreen = window.matchMedia('(max-width: 1024px)').matches;
    const hasTouchPointer = window.matchMedia('(pointer: coarse)').matches;

    return hasSmallScreen || hasTouchPointer;
}

export async function handleGoogleRedirect() {
    const credential = await getRedirectResult(auth);
    if (!credential) return null;

    await saveUser(credential.user);
    return credential.user;
}

export async function loginWithGoogle() {
    if (shouldUseRedirect()) {
        await signInWithRedirect(auth, googleProvider);
        return null;
    }

    const credential = await signInWithPopup(auth, googleProvider);
    await saveUser(credential.user);

    return credential.user;
}

export async function loginWithEmail(data: LoginT): Promise<User | CustomErrorResponse> {
    try {
        const credential = await signInWithEmailAndPassword(auth, data.email, data.password);
        if (credential.user.emailVerified === false) {
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

        await setDoc(doc(db, 'users', credential.user.uid), {
            uid: credential.user.uid,
            name: data.name,
            email: credential.user.email,
            photoURL: '',
            provider: 'password',
            createdAt: serverTimestamp(),
            updatedAt: serverTimestamp(),
        });

        await sendEmailVerification(credential.user);
        await signOut(auth);

        return credential.user;
    } catch (error) {
        return handleError(error);
    }
}

export async function updateUser(data: UpdateUserT) {
    try {
        console.log(data);
    } catch (error) {
        handleError(error);
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
