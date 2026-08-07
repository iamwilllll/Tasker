import { Navigate, Outlet } from 'react-router';
import { useAuth } from '@/features/auth/hooks';

export function GuestRoute() {
    const { user, isAuthenticated } = useAuth();

    if (isAuthenticated && user?.emailVerified) {
        return <Navigate to="/dashboard" replace />;
    }

    return <Outlet />;
}
