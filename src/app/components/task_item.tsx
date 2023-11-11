// TaskItem.tsx
import { FC, useState } from 'react';
import { HStack, Text, IconButton, Checkbox, Tooltip, useBoolean, Input } from '@chakra-ui/react';
import { FaTrash, FaEdit, FaSave } from 'react-icons/fa';
import { doc, deleteDoc, updateDoc } from 'firebase/firestore';
import { db } from '../lib/firebase_config';
import { Task } from '../types/taskTypes';

interface TaskItemProps {
    task: Task;
}

const TaskItem: FC<TaskItemProps> = ({ task }) => {
    const [isEditing, setIsEditing] = useBoolean();
    const [newTitle, setNewTitle] = useState<string>(task.title);

    const handleEdit = () => {
        setIsEditing.on();
    };

    const handleSave = async () => {
        if (!newTitle) return;

        await updateDoc(doc(db, 'tasks', task.id), {
        title: newTitle
    });

        setIsEditing.off();
    };

    const handleDelete = async () => {
        await deleteDoc(doc(db, 'tasks', task.id));
    };

    return (
        <HStack
            w="full"
            justify="space-between"
            p="4"
            boxShadow="md"
            _hover={{ bg: "gray.100" }}
        >
        {isEditing ? (
            <Input
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                size="sm"
                autoFocus
            />
            ) : (
            <Text as={task.completed ? 'del' : undefined}>{task.title}</Text>)}
            <HStack>
                {isEditing ? (
                    <Tooltip label="Save" hasArrow>
                    <IconButton
                    icon={<FaSave />}
                    aria-label="Save Task"
                    onClick={handleSave}
            />
                </Tooltip>
            ) : (
                <>
                <Tooltip label="Edit" hasArrow>
                    <IconButton
                    icon={<FaEdit />}
                    aria-label="Edit Task"
                    onClick={handleEdit}
                 />
                </Tooltip>
                <Tooltip label="Delete" hasArrow bg="red.600">
                  <IconButton
                    icon={<FaTrash />}
                    colorScheme="red"
                    aria-label="Delete Task"
                    onClick={handleDelete}
                  />
                </Tooltip>
              </>
            )}
          </HStack>
        </HStack>
      );
    };

export default TaskItem;
