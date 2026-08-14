import { useId, useState, type SubmitEvent } from 'react';
import { DashboardNav, DashboardFooter } from '../layout';
import { TaskListSection, ProfileModal, SettingsModal } from '../components';
import { useTask } from '../hooks';

type ActiveModal = 'settings' | 'profile' | null;

export function DashboardLayout() {
    const [activeModal, setActiveModal] = useState<ActiveModal>(null);

    const { tasks, addTask, toggleTask, deleteTask, completedCount, pendingCount, pendingTasks, completedTasks } = useTask();

    const [input, setInput] = useState('');
    const inputId = useId();

    const handleSubmit = (event: SubmitEvent<HTMLFormElement>) => {
        event.preventDefault();

        const taskText = input.trim();

        if (!taskText) return;

        addTask(taskText);
        setInput('');
    };

    return (
        <main className="font-primary text-primary-text bg-primary-surface flex min-h-screen flex-col px-5 pt-10 pb-24 md:grid md:min-w-0 md:grid-cols-[1fr_5fr] md:grid-rows-[1fr_auto] md:p-0">
            <DashboardNav onOpenSettings={() => setActiveModal('settings')} onOpenProfile={() => setActiveModal('profile')} />

            <div className="mx-auto flex w-full max-w-7xl flex-col gap-8 p-5 md:col-start-2 md:col-end-3 md:row-start-1 md:row-end-2">
                <header>
                    <h1 id="page-title" className="m-0 text-3xl font-bold tracking-tight">
                        My tasks
                    </h1>

                    <p className="text-secondary-text max-w-xs">Make your day better, one task at a time.</p>
                </header>
                <div className="flex h-full flex-col gap-6 md:grid md:grid-cols-[1fr_2fr] md:items-start">
                    <div className="flex flex-col gap-6">
                        <section className="border-task-border bg-task-surface rounded-xl border p-3 md:p-4">
                            <h2 id="add-task-heading" className="sr-only">
                                Add a new task
                            </h2>

                            <form onSubmit={handleSubmit} className="flex gap-2">
                                <label htmlFor={inputId} className="sr-only">
                                    Task description
                                </label>

                                <input
                                    id={inputId}
                                    name="task"
                                    type="text"
                                    placeholder="Write a new task..."
                                    value={input}
                                    onChange={(event) => setInput(event.target.value)}
                                    autoComplete="off"
                                    className="border-input-border focus:border-primary-text min-w-0 flex-1 rounded-xl border bg-transparent px-3.5 py-3 text-[15px] transition-colors outline-none md:py-3.5"
                                />

                                <button
                                    type="submit"
                                    disabled={!input.trim()}
                                    className="bg-primary-text text-button-text cursor-pointer rounded-xl px-5 py-3 text-[15px] font-medium transition-opacity disabled:cursor-not-allowed disabled:opacity-40"
                                >
                                    Add task
                                </button>
                            </form>
                        </section>

                        <section className="border-task-border bg-task-surface rounded-xl border p-4">
                            <h2 id="overview-heading" className="text-secondary-text m-0 mb-4 text-sm font-medium">
                                Overview
                            </h2>

                            <dl className="grid grid-cols-3 gap-2">
                                <div className="border-task-border rounded-xl border px-3 py-3">
                                    <dt className="text-muted-text text-xs">Total</dt>

                                    <dd className="mt-1 text-xl font-semibold">{tasks.length}</dd>
                                </div>

                                <div className="border-task-border rounded-xl border px-3 py-3">
                                    <dt className="text-muted-text text-xs">Pending</dt>

                                    <dd className="mt-1 text-xl font-semibold">{pendingCount}</dd>
                                </div>

                                <div className="border-task-border rounded-xl border px-3 py-3">
                                    <dt className="text-muted-text text-xs">Done</dt>

                                    <dd className="mt-1 text-xl font-semibold">{completedCount}</dd>
                                </div>
                            </dl>
                        </section>
                    </div>

                    <div className="flex h-full flex-col gap-6 md:grid md:grid-cols-2">
                        <TaskListSection
                            title="Pending"
                            taskCount={pendingCount}
                            tasks={pendingTasks}
                            totalTasksCount={tasks.length}
                            textForEmptyState="Everything is completed."
                            toggleTask={toggleTask}
                            deleteTask={deleteTask}
                        />

                        <TaskListSection
                            title="Completed"
                            taskCount={completedCount}
                            tasks={completedTasks}
                            totalTasksCount={tasks.length}
                            textForEmptyState="You have not yet completed tasks."
                            toggleTask={toggleTask}
                            deleteTask={deleteTask}
                        />
                    </div>
                </div>
                <DashboardFooter className="md:col-start-2 md:col-end-3 md:row-start-2 md:row-end-3" />{' '}
            </div>

            <SettingsModal open={activeModal === 'settings'} onClose={() => setActiveModal(null)} />

            <ProfileModal open={activeModal === 'profile'} onClose={() => setActiveModal(null)} />
        </main>
    );
}
