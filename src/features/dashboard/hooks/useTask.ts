import { useEffect, useState } from 'react';
import { addDoc, collection, deleteDoc, doc, onSnapshot, query, serverTimestamp, updateDoc, where } from 'firebase/firestore';
import { db } from '@/config';
import { useAuth } from '@/features/auth/hooks';
import type { TaskT } from '../types';

export function useTask() {
    const [tasks, setTasks] = useState<TaskT[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    const { user, isAuthLoading } = useAuth();

    useEffect(() => {
        if (isAuthLoading || !user) {
            return;
        }

        const tasksQuery = query(collection(db, 'tasks'), where('userId', '==', user.uid));

        const unsubscribe = onSnapshot(
            tasksQuery,
            (snapshot) => {
                const tasksData: TaskT[] = snapshot.docs.map((taskDoc) => {
                    const data = taskDoc.data();

                    return {
                        id: taskDoc.id,
                        text: data.text,
                        completed: data.completed,
                    };
                });

                setTasks(tasksData);
                setIsLoading(false);
            },
            (error) => {
                console.error('Error loading tasks:', error);
                setIsLoading(false);
            }
        );

        return unsubscribe;
    }, [user, isAuthLoading]);

    const addTask = async (inputValue: string) => {
        const taskText = inputValue.trim();

        if (!taskText || !user) {
            return;
        }

        try {
            await addDoc(collection(db, 'tasks'), {
                userId: user.uid,
                text: taskText,
                completed: false,
                createdAt: serverTimestamp(),
            });
        } catch (error) {
            console.error('Error adding task:', error);
        }
    };

    const toggleTask = async (id: TaskT['id']) => {
        const task = tasks.find((task) => task.id === id);

        if (!task) {
            return;
        }

        try {
            await updateDoc(doc(db, 'tasks', id), {
                completed: !task.completed,
            });
        } catch (error) {
            console.error('Error toggling task:', error);
        }
    };

    const deleteTask = async (id: TaskT['id']) => {
        try {
            await deleteDoc(doc(db, 'tasks', id));
        } catch (error) {
            console.error('Error deleting task:', error);
        }
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
        isLoading,
    };
}
