import React from "react";
import Header from "@components/layout/Header";

export const PageLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <>
            <h1>Next.js Frontend</h1>
            <Header />
            {children}
        </>
    );
};
