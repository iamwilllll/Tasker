import { TaskItem } from '../../components';
import type { TaskT } from '../../types';

type TaskListSectionProps = {
    taskCount: number;
    tasks: TaskT[];
    totalTasksCount: number;
    textForEmptyState?: string;
    toggleTask: (id: TaskT['id']) => void;
    deleteTask: (id: TaskT['id']) => void;
};

export function TaskListSection({
    taskCount,
    tasks,
    totalTasksCount,
    textForEmptyState,
    toggleTask,
    deleteTask,
}: TaskListSectionProps) {
    return (
        <section className="border-task-border bg-task-surface flex max-h-150 min-w-0 flex-col overflow-y-scroll rounded-xl border p-5 md:h-full">
            <header className="mb-5 flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <h2 className="m-0 text-base font-semibold">Pending</h2>

                    <span className="border-task-border text-muted-text rounded-full border px-2 py-0.5 text-xs">
                        {taskCount}
                    </span>
                </div>

                <span className="text-muted-text text-xs">{totalTasksCount} total</span>
            </header>

            {tasks.length > 0 ? (
                <ul className="m-0 flex list-none flex-col gap-1 p-0">
                    {tasks.map((task) => (
                        <TaskItem key={task.id} task={task} toggleTask={toggleTask} deleteTask={deleteTask} />
                    ))}
                </ul>
            ) : (
                <p className="border-task-border text-muted-text m-0 rounded-xl border border-dashed px-4 py-12 text-center text-sm">
                    {textForEmptyState || 'No tasks available.'}
                </p>
            )}
        </section>
    );
}
