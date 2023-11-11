import { FC, FormEvent, useState } from 'react';
import { Input, Button, HStack } from '@chakra-ui/react';
import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import { db } from '../lib/firebase_config';

const TaskInputForm: FC = () => {
  const [taskTitle, setTaskTitle] = useState<string>('');

  const addTaskToFirestore = async () => {
    if (!taskTitle) return;

    try {
      const docRef = doc(db, 'tasks', taskTitle);
      await setDoc(docRef, {
        title: taskTitle,
        completed: false,
        createdAt: serverTimestamp()
      });
      setTaskTitle(''); // タスク追加後、入力フィールドをクリア
    } catch (error) {
      console.error("Error adding task to Firestore: ", error);
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    addTaskToFirestore();
  };

  return (
    <form onSubmit={handleSubmit}>
      <HStack mt="8">
        <Input
          variant="filled"
          placeholder="新しいタスクを追加..."
          value={taskTitle}
          onChange={(e) => setTaskTitle(e.target.value)}
        />
        <Button colorScheme="teal" px="8" type="submit">
          追加
        </Button>
      </HStack>
    </form>
  );
};

export default TaskInputForm;