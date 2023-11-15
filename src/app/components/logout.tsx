"useClient";
import { FormEvent } from "react";
import { signOut } from "firebase/auth";
import { auth } from "../common/lib/firebase_config"
import { useRouter } from "next/navigation";
import { Button } from "@chakra-ui/react";

export const LogOut = () => {
    const Router = useRouter();

    const handleSignOut = async (e: FormEvent) => {
        e.preventDefault();

        try {
            await signOut(auth);
            Router.push("/");
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