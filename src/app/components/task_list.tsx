// TaskList.tsx
import { useEffect, useState, FC } from 'react';
import { Box, VStack, Text } from '@chakra-ui/react';
import TaskItem from './task_item';
import { collection, query, orderBy, onSnapshot } from 'firebase/firestore';
import { db } from '../lib/firebase_config';
import { Task } from '../types/taskTypes';

const TaskList: FC = () => {
    const [tasks, setTasks] = useState<Task[]>([]);

    useEffect(() => {
        const q = query(collection(db, 'tasks'), orderBy('createdAt', 'desc'));

        const unsubscribe = onSnapshot(q, (snapshot) => {
        const tasksFromFirestore = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }) as Task);
        setTasks(tasksFromFirestore);
        });

        return () => unsubscribe();
    }, []);

    return (
        <Box mt="8">
        {tasks.length ? (
            <VStack spacing="4">
            {tasks.map(task => <TaskItem key={task.id} task={task} />)}
            </VStack>
        ) : (
            <Text>タスクはまだありません。</Text>
        )}
        </Box>
    );
    };

export default TaskList;