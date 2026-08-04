import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { env } from './env';

const firebaseConfig = {
    apiKey: env.FIREBASE_API_KEY,
    authDomain: env.FIREBSE_AUTH_DOMAIN,
    projectId: env.FIREBSE_PROJECT_ID,
    storageBucket: env.FIREBSE_STORAGE_BUCKET,
    messagingSenderId: env.FIREBSE_MESSAGING_SENDER_ID,
    appId: env.FIREBSE_APP_ID,
};

export const firebaseApp = initializeApp(firebaseConfig);
export const auth = getAuth(firebaseApp);
export const db = getFirestore(firebaseApp);
export const googleProvider = new GoogleAuthProvider();

googleProvider.setCustomParameters({ prompt: 'select_account' });
