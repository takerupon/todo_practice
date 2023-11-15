"useClient";
import { signOut } from "firebase/auth";
import { auth } from "../common/lib/firebase_config"
import { useRouter } from "next/navigation";
import { Button } from "@chakra-ui/react";

export const SignOut = () => {
    const handleSignOut = async () => {
        try {
            await signOut(auth);
            useRouter().push("/");
        } catch (error: unknown) {
            if (error instanceof Error) {
                console.error(error.message);
            }
        }
    }

    return (
        <Button onClick={handleSignOut}>Log Out</Button>
    )
}