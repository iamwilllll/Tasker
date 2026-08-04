import { useEffect, type ReactNode } from 'react';
import { onAuthStateChanged } from 'firebase/auth';

import { auth } from '@/config/firebase';
import { useAuthStore } from '../store/useAuthStore';

export default function AuthProvider({ children }: { children: ReactNode }) {
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            useAuthStore.getState().setAuthState(user);
        });

        return unsubscribe;
    }, []);

    return <>{children}</>;
}
