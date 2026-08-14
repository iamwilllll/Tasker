import { Modal } from '@/components/ui/Modal';
import { useAuth } from '@/features/auth/hooks';
import { updateUser } from '@/features/auth/services/auth.service';

interface SettingsModalProps {
    open: boolean;
    onClose: () => void;
}

type Theme = 'system' | 'light' | 'dark' | 'shiny';
type Language = 'en';

export function SettingsModal({ open, onClose }: SettingsModalProps) {
    const { user } = useAuth();

    const theme = user?.preferences?.theme ?? 'system';
    const language = user?.preferences?.language ?? 'en';

    const handleThemeChange = async (newTheme: Theme) => {
        if (!user) return;

        await updateUser({
            preferences: {
                ...user.preferences,
                theme: newTheme,
            },
        });

        applyTheme(newTheme);
    };

    const handleLanguageChange = async (newLanguage: Language) => {
        if (!user) return;

        await updateUser({
            preferences: {
                ...user.preferences,
                language: newLanguage,
            },
        });
    };

    return (
        <Modal open={open} onClose={onClose} title="Settings" description="Manage your application preferences.">
            <div className="space-y-6">
                <section>
                    <h3 className="text-primary-text mb-3 text-sm font-semibold">Appearance</h3>

                    <div className="border-task-border flex items-center justify-between rounded-xl border p-3">
                        <div>
                            <p className="text-primary-text m-0 text-sm font-medium">Theme</p>

                            <p className="text-muted-text mt-0.5 mb-0 text-xs">Choose how Tasker looks.</p>
                        </div>

                        <select
                            value={theme}
                            onChange={(event) => handleThemeChange(event.target.value as Theme)}
                            className="border-input-border bg-primary-surface text-primary-text rounded-xl border px-3 py-2 text-sm outline-none"
                        >
                            <option value="system">System</option>
                            <option value="light">Light</option>
                            <option value="dark">Dark</option>
                            <option value="shiny">Shiny</option>
                        </select>
                    </div>
                </section>

                <section>
                    <h3 className="text-primary-text mb-3 text-sm font-semibold">Language</h3>

                    <div className="border-task-border flex items-center justify-between rounded-xl border p-3">
                        <div>
                            <p className="text-primary-text m-0 text-sm font-medium">Language</p>

                            <p className="text-muted-text mt-0.5 mb-0 text-xs">Choose your application language.</p>
                        </div>

                        <select
                            value={language}
                            onChange={(event) => handleLanguageChange(event.target.value as Language)}
                            className="border-input-border bg-primary-surface text-primary-text rounded-xl border px-3 py-2 text-sm outline-none"
                        >
                            <option value="en">English</option>
                        </select>
                    </div>
                </section>

                <section>
                    <h3 className="text-primary-text mb-3 text-sm font-semibold">Notifications</h3>

                    <label className="border-task-border flex cursor-pointer items-center justify-between rounded-xl border p-3">
                        <div>
                            <p className="text-primary-text m-0 text-sm font-medium">Task notifications</p>

                            <p className="text-muted-text mt-0.5 mb-0 text-xs">Receive reminders about your tasks.</p>
                        </div>

                        <input type="checkbox" className="size-4" />
                    </label>
                </section>

                <div className="border-task-border border-t pt-4">
                    <button
                        type="button"
                        onClick={onClose}
                        className="bg-primary-text text-button-text w-full cursor-pointer rounded-xl px-4 py-2.5 text-sm font-medium"
                    >
                        Done
                    </button>
                </div>
            </div>
        </Modal>
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
