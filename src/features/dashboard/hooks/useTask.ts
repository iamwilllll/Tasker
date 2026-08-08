import { useState } from 'react';
import type { TaskT } from '../types';

export function useTask() {
    const [tasks, setTasks] = useState<TaskT[]>([]);

    const addTask = (inputValue: string) => {
        const taskText = inputValue.trim();

        if (!taskText) return;

        setTasks((currentTasks) => [
            ...currentTasks,
            {
                id: crypto.randomUUID(),
                text: taskText,
                completed: false,
            },
        ]);
        console.log(`Task added: ${taskText}`);
    };

    const toggleTask = (id: TaskT['id']) => {
        setTasks((currentTasks) => currentTasks.map((task) => (task.id === id ? { ...task, completed: !task.completed } : task)));
    };

    const deleteTask = (id: TaskT['id']) => {
        setTasks((currentTasks) => currentTasks.filter((task) => task.id !== id));
        console.log(`Task with id ${id} has been deleted.`);
    };

    const completedCount = tasks.filter((task) => task.completed).length;
    const pendingCount = tasks.length - completedCount;
    const pendingTasks = tasks.filter((task) => !task.completed);
    const completedTasks = tasks.filter((task) => task.completed);

    return {
        tasks,
        addTask,
        toggleTask,
        deleteTask,
        completedCount,
        pendingCount,
        pendingTasks,
        completedTasks,
    };
}
