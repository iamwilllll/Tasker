import { create } from 'zustand';
import type { UserT } from '@/types';

type AuthStoreType = {
    user: UserT | null;
    isAuthenticated: boolean;
    isAuthLoading: boolean;
    setAuthLoading: (isLoading: boolean) => void;
    setAuthState: (user: UserT | null) => void;
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
