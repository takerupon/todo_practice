"use client"
import { useState, useEffect, FormEvent } from 'react';
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

type UserInfo = {
    useremail: string;
    userpassword: string;
};

export const SignUp = () => {
    const [useremail, setUseremail] = useState<string>('');
    const [userpassword, setUserpassword] = useState<string>('');
    const [repassword, setRepassword] = useState<string>('');
    const [alertMessage, setAlertMessage] = useState<string>('');
    const [successMessage, setSuccessMessage] = useState<string>('');

    const Router = useRouter();
    const { isOpen: isVisible, onClose, onOpen } = useDisclosure({ defaultIsOpen: false });

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();

        if (!useremail || !userpassword) {
            setAlertMessage('No email address or password entered');
            onOpen();
        } else if (userpassword !== repassword) {
            setAlertMessage('Passwords do not match');
            onOpen();
        } else {
            const oldUserInfo: UserInfo[] = JSON.parse(localStorage.getItem("userinfo") || "[]");
            const newUserInfo = [...oldUserInfo, { useremail, userpassword }];
            localStorage.setItem("userinfo", JSON.stringify(newUserInfo));
            setSuccessMessage("Account created successfully");
            onOpen();
            Router.push("/todo");
        }
    };

    return (
        <Flex height='100vh' alignItems='center' justifyContent='center' direction="column">
            {alertMessage && isVisible && (
                <Alert status="error" mb={4} maxWidth="500px">
                    <AlertIcon />
                    <AlertTitle mr={2}>Error!</AlertTitle>
                    <AlertDescription>{alertMessage}</AlertDescription>
                    <CloseButton position="absolute" right="8px" top="8px" onClick={onClose} />
                </Alert>
            )}
            {successMessage && isVisible && (
                <Alert status="success" mb={4} maxWidth="500px">
                    <AlertIcon />
                    <AlertTitle mr={2}>Success!</AlertTitle>
                    <AlertDescription>{successMessage}</AlertDescription>
                </Alert>
            )}
            <Flex direction='column' background="gray.100" padding={12} rounded={6}>
                <Flex align="center" justify="center">
                    <Heading mb={6}>Add account</Heading>
                </Flex>
                <Input borderColor='gray.400' placeholder="email address" variant="filled" mb={3} type="email" value={useremail} onChange={(e) => setUseremail(e.target.value)} />
                <Input borderColor="gray.400" placeholder="password" variant="filled" mb={3} type="password" value={userpassword} onChange={(e) => setUserpassword(e.target.value)} />
                <Input borderColor="gray.400" placeholder="re-enter your password" variant="filled" mb={3} type="password" value={repassword} onChange={(e) => setRepassword(e.target.value)} />
                <Button mt={3} mb={6} colorScheme="teal" onClick={handleSubmit}>
                    Sign Up
                </Button>
            </Flex>
        </Flex>
    );
};
