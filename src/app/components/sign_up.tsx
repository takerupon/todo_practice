"use client"
import { useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { useDisclosure } from '@chakra-ui/react';
import {
    Flex,
    Heading,
    Input,
    Button,
    Alert,
    AlertIcon,
    AlertTitle,
    AlertDescription,
    CloseButton,
} from '@chakra-ui/react';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth"; // Firebaseのインポート
import { firebaseApp } from "../lib/firebase_config"; // あなたのFirebaseの設定ファイルのパス

export const SignUp = () => {
    const [useremail, setUseremail] = useState<string>('');
    const [userpassword, setUserpassword] = useState<string>('');
    const [repassword, setRepassword] = useState<string>('');
    const [alertMessage, setAlertMessage] = useState<string>('');
    const [successMessage, setSuccessMessage] = useState<string>('');

    const Router = useRouter();
    const { isOpen: isVisible, onClose, onOpen } = useDisclosure({ defaultIsOpen: false });

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        const auth = getAuth();

        if (!useremail || !userpassword) {
            setAlertMessage('No email address or password entered');
        } else if (userpassword !== repassword) {
            setAlertMessage('Passwords do not match');
        } else {
            try {
                await createUserWithEmailAndPassword(auth, useremail, userpassword);
                setSuccessMessage("Account created successfully");
                Router.push("/todo");
            } catch (error: unknown) {
                if (error instanceof Error) {
                    setAlertMessage(error.message);
                }
            }
        }
        onOpen();
    };

    return (
        <Flex height='100vh' alignItems='center' justifyContent='center' direction="column">
            {isVisible && (
                <Alert status={alertMessage ? "error" : "success"} mb={4} maxWidth="500px">
                    <AlertIcon />
                    <AlertTitle mr={2}>{alertMessage ? "Error!" : "Success!"}</AlertTitle>
                    <AlertDescription>{alertMessage || successMessage}</AlertDescription>
                    <CloseButton position="absolute" right="8px" top="8px" onClick={onClose} />
                </Alert>
            )}
            <Flex direction='column' background="gray.100" padding={12} rounded={6}>
                <Flex align={"center"} justify={"center"}>
                    <Heading mb={6}> Add account</Heading>
                </Flex>
                <Input borderColor='gray.400' placeholder="email address" variant="filled" mb={3} type="email" value={useremail} onChange={(e) => setUseremail(e.target.value)} />
                <Input borderColor="gray.400" placeholder="password" variant="filled" mb={3} type="password" value={userpassword} onChange={(e) => setUserpassword(e.target.value)} />
                <Input borderColor="gray.400" placeholder="password（confirmation）" variant="filled" mb={3} type="password" value={repassword} onChange={(e) => setRepassword(e.target.value)} />
                <Button mt={3} mb={6} colorScheme="teal" onClick={handleSubmit}>
                    Sign Up
                </Button>
            </Flex>
        </Flex>
    );
};
