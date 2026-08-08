import { useEffect, type ReactNode } from 'react';

interface ModalProps {
    open: boolean;
    onClose: () => void;
    title: string;
    description?: string;
    children: ReactNode;
}

export function Modal({ open, onClose, title, description, children }: ModalProps) {
    useEffect(() => {
        if (!open) return;

        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                onClose();
            }
        };

        document.addEventListener('keydown', handleKeyDown);

        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, [open, onClose]);

    if (!open) return null;

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center p-5"
            role="presentation"
            onMouseDown={(event) => {
                if (event.target === event.currentTarget) {
                    onClose();
                }
            }}
        >
            <div className="bg-primary-text/20 absolute inset-0 backdrop-blur-sm" />

            <section
                role="dialog"
                aria-modal="true"
                aria-labelledby="modal-title"
                className="border-task-border bg-task-surface relative z-10 w-full max-w-lg rounded-2xl border p-5 shadow-2xl sm:p-6"
            >
                <header className="mb-6 flex items-start justify-between gap-4">
                    <div>
                        <h2 id="modal-title" className="text-primary-text m-0 text-lg font-semibold">
                            {title}
                        </h2>

                        {description && <p className="text-muted-text mt-1 mb-0 text-sm">{description}</p>}
                    </div>

                    <button
                        type="button"
                        onClick={onClose}
                        aria-label="Close modal"
                        className="text-muted-text hover:bg-primary-surface hover:text-primary-text flex size-8 shrink-0 cursor-pointer items-center justify-center rounded-lg transition-colors"
                    >
                        <svg className="size-5" aria-hidden="true">
                            <use href="/sprite.svg#close-icon" />
                        </svg>
                    </button>
                </header>

                {children}
            </section>
        </div>
    );
}
