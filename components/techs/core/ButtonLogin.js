import { Button } from "react-bootstrap";
import { useSession, signIn, signOut } from "next-auth/react";

export default function ButtonLogin() {
    const { data: session } = useSession();
    if (session) {
        return (
            <>
                Signed in as {session.username} <br />
                <Button className="ml-sm-2 mt-2 mt-sm-0" variant="danger" onClick={() => signOut()}>Sign out</Button>
            </>
        );
    }
    return (
        <>
            Not signed in <br />
            <Button className="ml-sm-2 mt-2 mt-sm-0" variant="primary" onClick={() => signIn()}>Sign in</Button>
        </>
    )
}