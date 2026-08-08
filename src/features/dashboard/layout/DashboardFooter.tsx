type DashboardFooterProps = {
    className?: string;
};

export function DashboardFooter({ className = '' }: DashboardFooterProps) {
    return (
        <footer
            className={`border-task-border bg-task-surface text-secondary-text w-full rounded-xl border px-5 py-4 text-sm ${className}`}
        >
            <div className="mx-auto flex w-full max-w-7xl items-center justify-between gap-4">
                <p className="m-0">© {new Date().getFullYear()} Tasker</p>

                <p className="text-muted-text m-0">Stay focused. Get things done.</p>
            </div>
        </footer>
    );
}
