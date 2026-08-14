import { useEffect } from 'react';
import { Navigate, Route, Routes } from 'react-router';
import { Login, Register, ForgotPassword } from '@/features/auth/pages';
import { DashboardLayout } from '@/features/dashboard/pages';
import { ProtectRoute, GuestRoute } from '@/components';
import { useAuth } from '@/features/auth/hooks';
import type { Language, Theme } from '@/types';

export type ExtendedUser = {
    preferences?: {
        theme?: Theme;
        language?: Language;
    };
};

function LoadingScreen() {
    return (
        <main className="bg-primary-background text-primary-text flex min-h-screen items-center justify-center">
            <div className="flex flex-col items-center gap-4">
                <div className="border-task-border border-t-primary-text size-8 animate-spin rounded-full border-2" />

                <p className="text-muted-text text-sm">Loading...</p>
            </div>
        </main>
    );
}

function applyTheme(theme: Theme) {
    const root = document.documentElement;

    root.classList.remove('light', 'dark', 'shiny');

    if (theme === 'system') {
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

        root.classList.add(prefersDark ? 'dark' : 'light');

        return;
    }

    root.classList.add(theme);
}

export default function App() {
    const { user, isAuthenticated, isAuthLoading } = useAuth();

    const currentUser = user as typeof user & ExtendedUser;
    const theme = currentUser?.preferences?.theme ?? 'system';
    const language = currentUser?.preferences?.language ?? 'en';

    useEffect(() => {
        applyTheme(theme);
    }, [theme]);

    useEffect(() => {
        document.documentElement.lang = language;
    }, [language]);

    if (isAuthLoading) {
        return <LoadingScreen />;
    }

    return (
        <Routes>
            <Route element={<GuestRoute />}>
                <Route path="/" element={<Navigate to="/login" replace />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/forgot-password" element={<ForgotPassword />} />
            </Route>

            <Route element={<ProtectRoute isAuthenticated={isAuthenticated} />}>
                <Route path="/dashboard" element={<DashboardLayout />} />
            </Route>

            <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
    );
}
