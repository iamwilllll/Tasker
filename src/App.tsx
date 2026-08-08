import { Routes, Route } from 'react-router';
import { Login, Register, ForgotPassword } from '@/features/auth/pages';
import { DashboardLayout } from '@/features/dashboard/pages';
import { ProtectRoute, GuestRoute } from '@/components';
import { useAuth } from '@/features/auth/hooks';

function Home() {
    return (
        <main>
            <p>Start page</p>
        </main>
    );
}

export default function App() {
    const { isAuthenticated, isAuthLoading } = useAuth();

    if (isAuthLoading) {
        return <div>Loading...,</div>;
    }

    return (
        <Routes>
            <Route element={<GuestRoute />}>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/forgot-password" element={<ForgotPassword />} />
            </Route>

            <Route element={<ProtectRoute isAuthenticated={isAuthenticated} />}>
                <Route path="/dashboard" element={<DashboardLayout />} />
            </Route>
        </Routes>
    );
}
