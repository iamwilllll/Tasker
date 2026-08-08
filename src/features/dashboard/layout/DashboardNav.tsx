import { useNavigate, Link } from 'react-router';
import type { JSX } from 'react/jsx-runtime';
import { signOut } from 'firebase/auth';
import { auth } from '@/config/firebase';
import { useAuth } from '@/features/auth/hooks';
import { useMediaQuery } from '../hooks';

type DashboardNavProps = {
    onOpenSettings: () => void;
    onOpenProfile: () => void;
};

type LinksT = {
    name: string;
    to: string;
    icon: JSX.Element;
};

export function DashboardNav({ onOpenSettings, onOpenProfile }: DashboardNavProps) {
    const { user } = useAuth();
    const navigate = useNavigate();

    const userInitial = (user?.displayName?.charAt(0) || user?.email?.charAt(0) || 'U').toUpperCase();
    const isDesktop = useMediaQuery('(min-width: 1024px)');

    const Links: LinksT[] = [
        {
            name: 'Dashboard',
            to: '/dashboard',
            icon: <use href="/sprite.svg#dashboard-icon" />,
        },
    ];

    const handleLogout = async () => {
        try {
            await signOut(auth);
            navigate('/login', { replace: true });
        } catch (error) {
            console.error('Failed to logout:', error);
        }
    };

    return (
        <>
            {isDesktop && (
                <section className="border-task-border bg-task-surface flex h-full w-full flex-col border-r px-4 py-5">
                    <h3 className="text-primary-text mb-8 px-3 text-4xl font-bold tracking-tight">Tasker</h3>

                    <nav className="flex-1">
                        <p className="text-muted-text mb-2 px-3 text-xs font-medium tracking-wider uppercase">Workspace</p>

                        {Links.map((link, index) => (
                            <Link
                                to={link.to}
                                key={index}
                                className="bg-primary-text text-button-text flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium"
                            >
                                <svg className="size-5" aria-hidden="true">
                                    {link.icon}
                                </svg>
                                {link.name}
                            </Link>
                        ))}
                    </nav>

                    <aside className="border-task-border border-t pt-4">
                        <button
                            type="button"
                            onClick={onOpenProfile}
                            className="hover:bg-primary-surface flex w-full cursor-pointer items-center gap-3 rounded-lg p-2 text-left transition-colors"
                        >
                            <div className="bg-primary-text text-button-text flex size-9 shrink-0 items-center justify-center rounded-full text-sm font-semibold">
                                {userInitial}
                            </div>

                            <div className="min-w-0">
                                <p className="text-primary-text truncate text-sm font-medium">{user?.displayName || 'User'}</p>
                                <p className="text-muted-text truncate text-xs">{user?.email}</p>
                            </div>
                        </button>

                        <div className="mt-2 grid grid-cols-2 gap-1">
                            <button
                                type="button"
                                onClick={onOpenSettings}
                                className="text-muted-text hover:bg-primary-surface hover:text-primary-text flex cursor-pointer items-center justify-center gap-2 rounded-xl px-2 py-2.5 text-xs font-medium transition-colors"
                            >
                                <svg className="size-4" aria-hidden="true">
                                    <use href="/sprite.svg#settings-icon" />
                                </svg>
                                Settings
                            </button>

                            <button
                                type="button"
                                onClick={handleLogout}
                                className="text-muted-text hover:bg-primary-surface hover:text-primary-text flex cursor-pointer items-center justify-center gap-2 rounded-xl px-2 py-2.5 text-xs font-medium transition-colors"
                            >
                                <svg className="size-5" aria-hidden="true">
                                    <use href="/sprite.svg#user-icon" />
                                </svg>
                                Logout
                            </button>
                        </div>
                    </aside>
                </section>
            )}

            {!isDesktop && (
                <nav className="border-task-border bg-task-surface fixed right-0 bottom-0 left-0 z-40 border-t">
                    <div className="grid grid-cols-3">
                        <button
                            type="button"
                            className="text-primary-text flex cursor-pointer flex-col items-center gap-1 px-3 py-3 text-xs font-medium"
                        >
                            <svg className="size-5" aria-hidden="true">
                                <use href="/sprite.svg#dashboard-icon" />
                            </svg>
                            Dashboard
                        </button>

                        <button
                            type="button"
                            onClick={onOpenSettings}
                            className="text-muted-text flex cursor-pointer flex-col items-center gap-1 px-3 py-3 text-xs font-medium"
                        >
                            <svg className="size-5" aria-hidden="true">
                                <use href="/sprite.svg#settings-icon" />
                            </svg>
                            Settings
                        </button>

                        <button
                            type="button"
                            onClick={onOpenProfile}
                            className="text-muted-text flex cursor-pointer flex-col items-center gap-1 px-3 py-3 text-xs font-medium"
                        >
                            <svg className="size-5" aria-hidden="true">
                                <use href="/sprite.svg#user-icon" />
                            </svg>
                            Profile
                        </button>
                    </div>
                </nav>
            )}
        </>
    );
}
