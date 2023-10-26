"use client"
import { useState, useEffect, FormEvent } from 'react';
import { useRouter } from 'next/navigation'; // 'next/navigation' ではなく 'next/router' です
import { CloseButton, useDisclosure } from '@chakra-ui/react'
import {
    Flex,
    Heading,
    Input,
    Button,
    Alert,
    AlertIcon,
    AlertTitle,
    AlertDescription,
} from '@chakra-ui/react';

type UserInfo = {
    useremail: string;
    userpassword: string;
};

export const Login = () => {
    const [useremail, setUseremail] = useState<string>('');
    const [userpassword, setUserpassword] = useState<string>('');
    const [userinfo, setUserinfo] = useState<UserInfo[] | null>(null);
    const [alertMessage, setAlertMessage] = useState<string>('');
    const [successMessage, setSuccessMessage] = useState<string>('');

    const Router = useRouter();

    useEffect(() => {
        getUserInfo();
    }, []);

    const getUserInfo = async () => {
        const userInfo = await localStorage.getItem("userInfo");
        if (userInfo) {
            setUserinfo(JSON.parse(userInfo));
        }
    };

    const {
        isOpen: isVisible,
        onClose,
        onOpen,
    } = useDisclosure({ defaultIsOpen: false })

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();

        if (useremail === "" || userpassword === "") {
            setAlertMessage('No email address or password entered');
            onOpen();
            return;
        }

        const isAuthenticated = userinfo?.some(
            (user: UserInfo) =>
                user.useremail === useremail && user.userpassword === userpassword
        ) || false;

        if (isAuthenticated) {
            setSuccessMessage('Login successful');
            onOpen();
            Router.push("/todo");
        } else {
            setAlertMessage('Login failed');
            onOpen();
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
                <Input placeholder="sample@sample.com" variant="filled" mb={3} type="email" onChange={(e) => setUseremail}/>
                <Input placeholder="*********" variant="filled" mb={6} type="password" onChange={(e) => setUserpassword}/>
                <Button onClick={handleSubmit} mb={6} colorScheme="teal" type="submit">
                    Log In
                </Button>
            <Button mb={6} colorScheme="teal" onClick={() => Router.push('/create_account')}>
                Sign Up
            </Button>
        </Flex>
    </Flex>
    )
}

