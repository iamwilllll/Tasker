import { useAuthStore } from '../store/useAuthStore';

export function useAuth() {
    const user = useAuthStore((state) => state.user);
    const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
    const isAuthLoading = useAuthStore((state) => state.isAuthLoading);

    return {
        user,
        isAuthenticated,
        isAuthLoading,
    };
}
