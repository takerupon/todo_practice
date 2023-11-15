"useClient";
import {Box, Flex, Button, Text, useColorModeValue} from '@chakra-ui/react';
import { LogOut } from './components/logout';

type HeaderProps = {
    showLogoutButton: boolean;
}

export default function Header({showLogoutButton}: HeaderProps) {
    return (
        <Flex
            as="header"
            width="full"
            align="center"
            justifyContent="space-between"
            wrap="wrap"
            padding={6}
            color="teal.500"
            boxShadow="sm"
        >
            <Flex align="center" mr={5}>
                <Text  fontSize="lg" fontWeight="bold" letterSpacing="tight">
                    Todo App
                </Text>
            </Flex>

            <Box flex={1} textAlign={"right"}>
                {/* 他のナビゲーションリンクをここに追加 */}
                {showLogoutButton &&(
                    <LogOut />
                )}
            </Box>
        </Flex>
    );
};
