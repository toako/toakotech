import React from 'react';
import { SessionProvider } from "next-auth/react";
import '@fortawesome/fontawesome-svg-core/styles.css';
import '../styles/main.scss';


export default function App({ Component, pageProps: { session, ...pageProps } }) {
    return (
        <SessionProvider session={session}>
            <Component {...pageProps} />
        </SessionProvider>
    );
}