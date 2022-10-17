import React from 'react';
import { SessionProvider } from "next-auth/react";
import '../shared/css/main.scss';


export default function App({ Component, pageProps: { session, ...pageProps } }) {
    return (
        <SessionProvider session={session}>
            <Component {...pageProps} />
        </SessionProvider>
    );
}