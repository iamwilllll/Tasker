import { Navigate, Outlet } from 'react-router';
import { useAuth } from '@/features/auth/hooks';

export function ProtectRoute({ isAuthenticated }: { isAuthenticated: boolean }) {
    const { user } = useAuth();

    if (!isAuthenticated || !user?.emailVerified) {
        return <Navigate to="/login" replace />;
    }

    return <Outlet />;
}
