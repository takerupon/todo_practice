"useClient";
import { Box, Text, Container, Stack} from '@chakra-ui/react';

export default function Footer () {
    return (
        <Box
            width="full"
            position="fixed" // スクロールによってフッターが常に下に表示されるようにする
            bottom={0}
            left={0}
            px={4} // 左右のパディング
            py={2} // 上下のパディング
        >
            <Container
                as={Stack}
                maxW={'6xl'}
                py={4}
                direction={{ base: 'column', md: 'row' }}
                spacing={4}
                justify={{ base: 'center', md: 'space-between' }}
                align={{ base: 'center', md: 'center' }}
            >
                <Text>© {new Date().getFullYear()} Todo App. All rights reserved.</Text>
                <Stack direction={'row'} spacing={6}>
                    {/* ここに追加のフッターナビゲーションリンクを追加することができます */}
                    <Text>Privacy Policy</Text>
                    <Text>Terms Of Use</Text>
                </Stack>
            </Container>
        </Box>
    );
};
