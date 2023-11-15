"use client"
import { useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
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
    useDisclosure
} from '@chakra-ui/react';
import { signInWithEmailAndPassword } from "firebase/auth";  // Firebaseの関数を追加
import { auth } from "../common/lib/firebase_config";      // あなたのFirebaseの設定ファイルのパス

export const Login = () => {
    const [useremail, setUseremail] = useState<string>('');
    const [userpassword, setUserpassword] = useState<string>('');
    const [alertMessage, setAlertMessage] = useState<string>('');
    const [successMessage, setSuccessMessage] = useState<string>('');

    const Router = useRouter();

    const { isOpen: isVisible, onClose, onOpen } = useDisclosure({ defaultIsOpen: false });

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();

        if (useremail === "" || userpassword === "") {
            setAlertMessage('No email address or password entered');
            onOpen();
            return;
        }

        try {
            await signInWithEmailAndPassword(auth, useremail, userpassword);  // Firebaseでの認証処理に変更
            setSuccessMessage('Login successful');
            onOpen();
            Router.push("features/todo");
        } catch (error: unknown) {
            if (error instanceof Error) {
                setAlertMessage('Login failed: ' + error.message);
                onOpen();
            }
        }
    }

    return (
    <Flex height={'100vh'} alignItems={'center'} justifyContent={'center'} direction={"column"}>
        {alertMessage && isVisible && (
            <Alert status="error" mb={4} maxWidth={"500px"}>
                <AlertIcon />
                <AlertTitle mr={2}>Error!</AlertTitle>
                <AlertDescription>{alertMessage}</AlertDescription>
                <CloseButton position="absolute" right="8px" top="8px" onClick={onClose} />
            </Alert>
        )}
        {successMessage && isVisible && (
            <Alert status="success">
                <AlertIcon />
                <AlertTitle mr={2}>Success!</AlertTitle>
                <AlertDescription>{successMessage}</AlertDescription>
            </Alert>
        )}
        <Flex direction={'column'} background="gray.100" padding={12} rounded={6}>
            <Flex align={"center"} justify={"center"}>
                <Heading mb={6}> Log In</Heading>
            </Flex>
                <Input
                    placeholder="sample@sample.com"
                    variant="filled"
                    mb={3} type="email"
                    onChange={(e) => setUseremail(e.target.value)}/>
                <Input
                    placeholder="*********"
                    variant="filled"
                    mb={6}
                    type="password"
                    onChange={(e) => setUserpassword(e.target.value)}/>
                <Button onClick={handleSubmit} mb={6} colorScheme="teal" type="submit">
                    Log In
                </Button>
            <Button mb={6} colorScheme="teal" onClick={() => Router.push('features/sign_up')}>
                Sign Up
            </Button>
        </Flex>
    </Flex>
    )
}

