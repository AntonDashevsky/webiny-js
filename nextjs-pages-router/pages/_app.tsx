import React from "react";
import type { AppProps } from "next/app";
import { ContentSdkInitializer } from "@components/ContentSdkInitializer";
import "../styles/globals.css";

export default function MyApp({ Component, pageProps }: AppProps) {
    return (
        <>
            <ContentSdkInitializer />
            <Component {...pageProps} />
        </>
    );
}
