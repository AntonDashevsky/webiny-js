import React from "react";

export const PageLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <>
            <h1>Next.js Frontend</h1>
            {children}
        </>
    );
};
