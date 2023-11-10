import { firestore } from '../lib/firebase_config';
import { collection, getDocs, query, orderBy, addDoc, serverTimestamp, doc, updateDoc, deleteDoc } from 'firebase/firestore';

export const getTasks = async () => {
    const tasksCollection = query(collection(firestore, 'tasks'), orderBy('createdAt'));
    const taskSnapshot = await getDocs(tasksCollection);
    const tasksList = taskSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    return tasksList;
};

export const addTask = async (title: string) => {
    await addDoc(collection(firestore, 'tasks'), {
        title,
        completed: false,
        createdAt: serverTimestamp()
    });
};

export const updateTask = async (taskId: string, newValues: object) => {
    const taskDoc = doc(firestore, 'tasks', taskId);
    await updateDoc(taskDoc, newValues);
};

export const deleteTask = async (taskId: string) => {
    const taskDoc = doc(firestore, 'tasks', taskId);
    await deleteDoc(taskDoc);
};

