import { Box, VStack, Text, FC } from '@chakra-ui/react';
import TaskItem from './task_item'; // TaskItemコンポーネントをインポート
import { Task } from '../types/taskTypes';

interface TaskListProps {
    tasks: Task[];
    onUpdateTask: (taskId: string) => void;
    onDeleteTask: (taskId: string) => void;
}

const TaskList: FC<TaskListProps> = ({ tasks, onUpdateTask, onDeleteTask }) => {
    return (
    <Box mt="8">
        {tasks.length ? (
        <VStack spacing="4">
            {tasks.map((task) => (
                <TaskItem
                    key={task.id}
                    task={task}
                    onUpdateTask={onUpdateTask}
                    onDeleteTask={onDeleteTask}
                />
                ))}
        </VStack>
        ) : (
        <Text>タスクはまだありません。</Text>
        )}
    </Box>
    );
};

export default TaskList;
