// TaskList.tsx
import { useEffect, useState, FC } from 'react';
import { Box, VStack, Text } from '@chakra-ui/react';
import TaskItem from './task_item';
import { collection, query, orderBy, onSnapshot, where } from 'firebase/firestore';
import { db, auth } from '../common/lib/firebase_config';
import { Task } from '../common/types/taskTypes';

const TaskList: FC = () => {
    const [tasks, setTasks] = useState<Task[]>([]);

    useEffect(() => {
        const user = auth.currentUser;// ログイン中のユーザーを取得
        if (!user) {
            console.error("No user logged in.");
            return;
        }
        // ユーザーIDが一致するタスクのみを取得
        const q = query(
            collection(db, 'tasks'),
            where('userId', '==', user.uid),
            orderBy('createdAt', 'desc')
        );

        const unsubscribe = onSnapshot(q, (snapshot) => {
            const tasksFromFirestore = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }) as Task);
            setTasks(tasksFromFirestore);
        });

        return () => unsubscribe();// クリーンアップ関数
    }, [auth.currentUser]);

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