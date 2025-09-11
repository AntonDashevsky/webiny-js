import React from "react";
import { Toast } from "~/Toast/index.js";
import { Tooltip } from "~/Tooltip/index.js";

export interface ProvidersProps {
    children?: React.ReactNode;
}

export const Providers = ({ children }: ProvidersProps) => {
    return (
        <>
            <Tooltip.Provider>{children}</Tooltip.Provider>
            <Toast.Provider />
        </>
    );
};
