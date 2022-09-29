import React from 'react';
import './css/main.scss';

export default function App({ Component, pageProps }) {
    return (
        <Component {...pageProps} />
    );
}