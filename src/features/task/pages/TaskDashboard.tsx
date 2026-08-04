import { TaskItem } from '../components/TaskItem';
import { useTask } from '../hooks/useTask';
import { useId, useState, type SubmitEvent } from 'react';

export function TaskDashboard() {
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
        <main className="bg-primary-surface font-primary text-primary-text min-h-screen px-5 py-10 lg:px-10 lg:py-12">
            <div className="mx-auto w-full max-w-120 lg:grid lg:max-w-7xl lg:grid-cols-[360px_minmax(0,1fr)] lg:items-start lg:gap-10 xl:grid-cols-[400px_minmax(0,1fr)] xl:gap-14">
                <div className="lg:sticky lg:top-12">
                    <header className="mb-8">
                        <h1 id="page-title" className="m-0 text-3xl font-bold tracking-tight lg:text-4xl">
                            My tasks
                        </h1>

                        <p className="text-secondary-text mt-1 lg:mt-2 lg:max-w-xs lg:text-base">
                            Make your day better, one task at a time.
                        </p>
                    </header>

                    <section className="border-task-border bg-task-surface mb-7 rounded-xl border p-3 lg:mb-5 lg:p-4">
                        <h2 id="add-task-heading" className="sr-only">
                            Add a new task
                        </h2>

                        <form onSubmit={handleSubmit} className="flex gap-2 lg:flex-col">
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
                                className="border-input-border focus:border-primary-text min-w-0 flex-1 rounded-lg border bg-transparent px-3.5 py-3 text-[15px] transition-colors outline-none lg:w-full lg:py-3.5"
                            />

                            <button
                                type="submit"
                                disabled={!input.trim()}
                                className="bg-primary-text text-button-text cursor-pointer rounded-lg px-5 py-3 text-[15px] font-medium transition-opacity disabled:cursor-not-allowed disabled:opacity-40 lg:w-full lg:py-3.5"
                            >
                                Add task
                            </button>
                        </form>
                    </section>

                    <section className="border-task-border bg-task-surface hidden rounded-xl border p-4 lg:block">
                        <h2 id="overview-heading" className="text-secondary-text m-0 mb-4 text-sm font-medium">
                            Overview
                        </h2>

                        <dl className="grid grid-cols-3 gap-2">
                            <div className="border-task-border rounded-lg border px-3 py-3">
                                <p className="text-muted-text text-xs">Total</p>
                                <p className="mt-1 text-xl font-semibold">{tasks.length}</p>
                            </div>

                            <div className="border-task-border rounded-lg border px-3 py-3">
                                <p className="text-muted-text text-xs">Pending</p>
                                <p className="mt-1 text-xl font-semibold">{pendingCount}</p>
                            </div>

                            <div className="border-task-border rounded-lg border px-3 py-3">
                                <p className="text-muted-text text-xs">Done</p>
                                <p className="mt-1 text-xl font-semibold">{completedCount}</p>
                            </div>
                        </dl>
                    </section>
                </div>

                <section className="min-w-0">
                    <header className="mb-6 hidden items-end justify-between lg:flex">
                        <div>
                            <p className="text-muted-text m-0 text-sm">Your workspace</p>

                            <h2 id="task-overview-heading" className="mt-1 mb-0 text-2xl font-semibold tracking-tight">
                                Task overview
                            </h2>
                        </div>

                        <p className="border-task-border text-muted-text m-0 rounded-full border px-3 py-1.5 text-sm">
                            {tasks.length} {tasks.length === 1 ? 'task' : 'tasks'}
                        </p>
                    </header>

                    <p className="sr-only">
                        {pendingCount} pending {pendingCount === 1 ? 'task' : 'tasks'} and {completedCount} completed{' '}
                        {completedCount === 1 ? 'task' : 'tasks'}.
                    </p>

                    {tasks.length > 0 ? (
                        <div className={`space-y-7 lg:grid lg:grid-cols-2 lg:items-start lg:gap-6 lg:space-y-0`}>
                            <section className="lg:border-task-border lg:bg-task-surface lg:w-full lg:rounded-xl lg:border lg:p-5">
                                <header className="mb-3 flex items-center justify-between lg:mb-5">
                                    <div className="flex items-center gap-2">
                                        <h2 className="m-0 text-sm font-semibold lg:text-base">Pending</h2>

                                        <span className="border-task-border text-muted-text rounded-full border px-2 py-0.5 text-xs">
                                            {pendingCount}
                                        </span>
                                    </div>

                                    <span className="text-muted-text text-xs lg:hidden">{tasks.length} total</span>
                                </header>

                                {pendingTasks.length > 0 ? (
                                    <ul className="m-0 list-none space-y-2 p-0 lg:space-y-3">
                                        {pendingTasks.map((task) => (
                                            <TaskItem key={task.id} task={task} toggleTask={toggleTask} deleteTask={deleteTask} />
                                        ))}
                                    </ul>
                                ) : (
                                    <p
                                        role="status"
                                        className="border-task-border text-muted-text m-0 rounded-xl border border-dashed px-4 py-6 text-center text-sm lg:py-12"
                                    >
                                        Everything is completed.
                                    </p>
                                )}
                            </section>

                            {
                                <section className="lg:border-task-border lg:bg-task-surface lg:rounded-xl lg:border lg:p-5">
                                    <header className="mb-3 flex items-center gap-2 lg:mb-5">
                                        <h2 className="text-muted-text m-0 text-sm font-semibold lg:text-base">Completed</h2>

                                        <span className="border-task-border text-muted-text rounded-full border px-2 py-0.5 text-xs">
                                            {completedCount}
                                        </span>
                                    </header>

                                    <ul className="m-0 list-none space-y-2 p-0 lg:space-y-3">
                                        {completedTasks.map((task) => (
                                            <TaskItem key={task.id} task={task} toggleTask={toggleTask} deleteTask={deleteTask} />
                                        ))}
                                    </ul>
                                </section>
                            }
                        </div>
                    ) : (
                        <section className="border-task-border rounded-xl border border-dashed px-6 py-12 text-center lg:flex lg:min-h-100 lg:flex-col lg:items-center lg:justify-center lg:py-20">
                            <div
                                aria-hidden="true"
                                className="border-task-border mx-auto mb-4 flex size-12 items-center justify-center rounded-full border lg:size-14"
                            >
                                <svg className="size-5 lg:size-6" focusable="false">
                                    <use href="/sprite.svg#check-icon" />
                                </svg>
                            </div>

                            <h2 id="empty-state-heading" className="m-0 text-base font-semibold lg:text-lg">
                                No tasks yet
                            </h2>

                            <p className="text-muted-text mt-1 mb-0 text-sm">Add your first task to get started.</p>
                        </section>
                    )}
                </section>
            </div>
        </main>
    );
}
