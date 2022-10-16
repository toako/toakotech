import { Button } from "react-bootstrap";
import { useSession, signIn, signOut } from "next-auth/react";

export default function ButtonLogin() {
    const { data: session } = useSession();
    if (session) {
        return (
            <>
                Signed in as {session.user.email} <br />
                <Button className="ml-2" variant="danger" onClick={() => signOut()}>Sign out</Button>
            </>
        );
    }
    return (
        <>
            Not signed in <br />
            <Button className="ml-2" variant="primary" onClick={() => signIn()}>Sign in</Button>
        </>
    )
}