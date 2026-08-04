import { getRedirectResult, signInWithPopup, signInWithRedirect, signOut, type User } from 'firebase/auth';
import { doc, getDoc, serverTimestamp, setDoc } from 'firebase/firestore';
import { auth, db, googleProvider } from '@/config/firebase';

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
        provider: 'google',
        updatedAt: serverTimestamp(),
        lastLoginAt: serverTimestamp(),
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

export async function loginWithGoogle() {
    if (shouldUseRedirect()) {
        await signInWithRedirect(auth, googleProvider);
        return null;
    }

    const credential = await signInWithPopup(auth, googleProvider);
    await saveUser(credential.user);

    return credential.user;
}

export async function handleGoogleRedirect() {
    const credential = await getRedirectResult(auth);
    if (!credential) return null;

    await saveUser(credential.user);
    return credential.user;
}

export async function logout() {
    await signOut(auth);
}
