"use client"
import { useToast, Button } from '@chakra-ui/react'
import { useDisclosure } from '@chakra-ui/react'

export const ToastExample = () => {
    const toast = useToast()
    return (
      <Button
        onClick={() =>
          toast({
            title: 'Account created.',
            description: "We've created your account for you.",
            status: 'success',
            duration: 9000,
            isClosable: true,
          })
        }
      >
        Show Toast
      </Button>
    )
  }
