import { FC, FormEvent, useState } from 'react';
import { Input, Button, HStack, Flex } from '@chakra-ui/react';
import { doc, setDoc, addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db, auth } from '../lib/firebase_config';
import { FirebaseError } from '@firebase/app';

const TaskInputForm: FC = () => {
  const [taskTitle, setTaskTitle] = useState<string>('');

  const addTask = async () => {
    if (!taskTitle) return;

    const user = auth.currentUser;
    if (!user) {
      console.error("No user logged in.");
      return;
    }

    try {
      await addDoc(collection(db, 'tasks'), {
        title: taskTitle,
        completed: false,
        userId: user.uid, // ユーザーIDを保存
        createdAt: serverTimestamp()
      });
      setTaskTitle(''); // タスク追加後、入力フィールドをクリア
    } catch (error) {
      if (error instanceof FirebaseError) {
        console.error("Error adding task to Firestore: ", error.message, "Code:", error.code);
      } else {
        console.error("Error adding task to Firestore: ", error);
      }
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    addTask();
  };

  return (
    <Flex
      as="form"
      onSubmit={handleSubmit}
      mt="4"
      p="4"
      px={8}
      background="white"
      boxShadow="base"
      borderRadius="lg"
      align="center"
      maxWidth="container.md" // 最大幅を設定
      marginX="auto" // 左右のマージンを自動に
      direction="column" // Align the stack vertically
    >
      <HStack width="full">
        <Input
          flex="1"
          variant="filled"
          placeholder="新しいタスクを追加..."
          size="lg"
          borderRadius="lg"
          value={taskTitle}
          onChange={(e) => setTaskTitle(e.target.value)}
        />
        <Button colorScheme="teal" px="8" h="2.5rem" borderRadius="lg" type="submit">
          追加
        </Button>
      </HStack>
    </Flex>
  );
};

export default TaskInputForm;