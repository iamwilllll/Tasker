import { create } from 'zustand';
import type { User } from 'firebase/auth';

type AuthStoreType = {
    user: User | null;
    isAuthenticated: boolean;
    isAuthLoading: boolean;
    setAuthLoading: (isLoading: boolean) => void;
    setAuthState: (user: User | null) => void;
};

export const useAuthStore = create<AuthStoreType>((set) => ({
    user: null,
    isAuthenticated: false,
    isAuthLoading: true,

    setAuthLoading: (isLoading) => set({ isAuthLoading: isLoading }),

    setAuthState: (user) =>
        set({
            user,
            isAuthenticated: !!user,
            isAuthLoading: false,
        }),
}));
