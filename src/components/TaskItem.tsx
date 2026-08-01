import type { TaskT } from '../types';

type TaskItemProps = {
    task: TaskT;
    toggleTask: (id: TaskT['id']) => void;
    deleteTask: (id: TaskT['id']) => void;
};

export function TaskItem({ task, toggleTask, deleteTask }: TaskItemProps) {
    return (
        <li className="border-task-border bg-task-surface mb-2 flex items-center gap-3 rounded-lg border p-3.5">
            <input
                type="checkbox"
                checked={task.completed}
                onChange={() => toggleTask(task.id)}
                className="accent-app-green size-4 cursor-pointer"
            />

            <span className={`flex-1 text-[15px] ${task.completed ? 'text-muted-text line-through' : 'text-primary-text'}`}>
                {task.text}
            </span>

            <button
                type="button"
                onClick={() => deleteTask(task.id)}
                aria-label={`Delete ${task.text}`}
                className="bg-delete-button-surface hover:text-app-red size-5 cursor-pointer border-none text-base opacity-60 hover:opacity-100"
            >
                <svg className="size-full">
                    <use href="/sprite.svg#trash-icon" />
                </svg>
            </button>
        </li>
    );
}
