import { HStack, Text, IconButton, FC } from '@chakra-ui/react';
import { FaTrash, FaEdit } from 'react-icons/fa';
import { Task } from '../types/taskTypes';

interface TaskItemProps {
    task: Task;
    onUpdateTask: (taskId: string) => void;
    onDeleteTask: (taskId: string) => void;
}

const TaskItem: FC<TaskItemProps> = ({ task, onUpdateTask, onDeleteTask }) => {
    return (
        <HStack w="full" justify="space-between">
        <Text>{task.title}</Text>
        <HStack>
            <IconButton
            icon={<FaEdit />}
            aria-label="Edit Task"
            onClick={() => onUpdateTask(task.id)}
            />
            <IconButton
            icon={<FaTrash />}
            colorScheme="red"
            aria-label="Delete Task"
            onClick={() => onDeleteTask(task.id)}
            />
        </HStack>
        </HStack>
    );
};

export default TaskItem;
