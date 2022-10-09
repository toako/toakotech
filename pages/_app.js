import React from 'react';
import '../shared/css/main.scss';

export default function App({ Component, pageProps }) {
    return (
        <Component {...pageProps} />
    );
}