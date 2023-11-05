"use client"
import { useState, FormEvent } from 'react';
import { useDisclosure } from '@chakra-ui/react';
import { getFirestore, collection, addDoc, query, onSnapshot, doc, updateDoc, deleteDoc } from "firebase/firestore";
import { firebaseApp, auth, firestore } from "../lib/firebase_config"; // あなたのFirebaseの設定ファイルのパス
import { Input, Button, Alert, AlertIcon, AlertTitle, AlertDescription, CloseButton, Flex } from '@chakra-ui/react';

const addTodo =async (task: string) => {
  const [alertMessage, setAlertMessage] = useState<string>('');
  const [successMessage, setSuccessMessage] = useState<string>('');

  const { isOpen: isVisible, onClose, onOpen } = useDisclosure({ defaultIsOpen: false });


  try {
    const docRef = await addDoc(collection(firestore, "todos"), {
      task,
      completed: false,
      createdAt: new Date(),
  });
  setSuccessMessage("Todo added successfully");
  } catch (e) {
    setAlertMessage("Error adding todo: " + e);
  }
  onOpen();
};

const TodoInput = () => {
  const [inputValue, setInputValue] = useState<string>('');

  const handleAddTodo = async () => {
    if(inputValue.trim() === '') return;
    await addTodo(inputValue.trim());
    setInputValue('');
  };

  return (
    <Flex mt="8" justifyContent="center">
      <Input
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder="ToDoを追加"
        size="md"
        width="auto"
        mr="4"
      />
      <Button
        onClick={handleAddTodo}
        colorScheme="blue"
        px="8"
      >
        追加
      </Button>
    </Flex>
  );
};

