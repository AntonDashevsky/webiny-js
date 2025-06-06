import React from "react";
import "./globals.css";
import { ContentSdkInitializer } from "@components/ContentSdkInitializer";

export default function RootLayout({
    children
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <head>
                <link rel="stylesheet" href="https://rsms.me/inter/inter.css" />
            </head>
            <body>
                <ContentSdkInitializer />
                {children}
            </body>
        </html>
    );
}
