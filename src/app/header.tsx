"useClient";
import {Box, Flex, Button, Text, useColorModeValue} from '@chakra-ui/react';

export default function Header() {
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
                <Button variant="outline" colorScheme="teal" mr={4}>
                    Log Out
                </Button>
            </Box>
        </Flex>
    );
};
