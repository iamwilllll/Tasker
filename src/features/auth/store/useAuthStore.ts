import { create } from 'zustand';
import type { User } from 'firebase/auth';

type AuthStoreType = {
    user: User | null;
    isAuthenticated: boolean;
    isAuthLoading: boolean;
    setAuthState: (user: User | null) => void;
};

export const useAuthStore = create<AuthStoreType>((set) => ({
    user: null,
    isAuthenticated: false,
    isAuthLoading: true,

    setAuthState: (user) =>
        set({
            user,
            isAuthenticated: Boolean(user),
            isAuthLoading: false,
        }),
}));
