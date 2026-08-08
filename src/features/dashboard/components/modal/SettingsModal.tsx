import { Modal } from '@/components/ui/Modal';

interface SettingsModalProps {
    open: boolean;
    onClose: () => void;
}

export function SettingsModal({ open, onClose }: SettingsModalProps) {
    return (
        <Modal open={open} onClose={onClose} title="Settings" description="Manage your application preferences.">
            <div className="space-y-6">
                <section>
                    <h3 className="text-primary-text mb-3 text-sm font-semibold">Appearance</h3>

                    <div className="border-task-border flex items-center justify-between rounded-xl border p-3">
                        <div>
                            <p className="text-primary-text m-0 text-sm font-medium">Theme</p>

                            <p className="text-muted-text mt-0.5 mb-0 text-xs">Choose how Taskodoro looks.</p>
                        </div>

                        <select
                            defaultValue="system"
                            className="border-input-border bg-primary-surface text-primary-text rounded-xl border px-3 py-2 text-sm outline-none"
                        >
                            <option value="system">System</option>
                            <option value="light">Light</option>
                            <option value="dark">Dark</option>
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
