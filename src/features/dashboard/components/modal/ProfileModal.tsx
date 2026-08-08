import { Modal } from '@/components/ui/Modal';
import { useAuth } from '@/features/auth/hooks';

interface ProfileModalProps {
    open: boolean;
    onClose: () => void;
}

export function ProfileModal({ open, onClose }: ProfileModalProps) {
    const { user } = useAuth();

    const initial = (user?.displayName?.charAt(0) || user?.email?.charAt(0) || 'U').toUpperCase();

    return (
        <Modal open={open} onClose={onClose} title="Profile" description="Your account information.">
            <div className="space-y-5">
                <div className="flex flex-col items-center">
                    <div className="bg-primary-text text-button-text flex size-20 items-center justify-center rounded-full text-2xl font-semibold">
                        {initial}
                    </div>

                    <h3 className="text-primary-text mt-3 mb-0 text-lg font-semibold">{user?.displayName || 'User'}</h3>

                    <p className="text-muted-text mt-1 mb-0 text-sm">{user?.email}</p>
                </div>

                <div className="space-y-3">
                    <div className="border-task-border rounded-xl border p-3">
                        <p className="text-muted-text m-0 text-xs">Email</p>

                        <p className="text-primary-text mt-1 mb-0 text-sm font-medium">{user?.email || '—'}</p>
                    </div>

                    <div className="border-task-border rounded-xl border p-3">
                        <p className="text-muted-text m-0 text-xs">Email verification</p>

                        <p className="text-primary-text mt-1 mb-0 text-sm font-medium">
                            {user?.emailVerified ? 'Verified' : 'Not verified'}
                        </p>
                    </div>
                </div>

                <button
                    type="button"
                    onClick={onClose}
                    className="bg-primary-text text-button-text w-full cursor-pointer rounded-xl px-4 py-2.5 text-sm font-medium"
                >
                    Close
                </button>
            </div>
        </Modal>
    );
}
