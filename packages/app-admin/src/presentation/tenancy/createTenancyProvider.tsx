import React from "react";
import { createProvider } from "@webiny/app";
import { TenancyProvider } from "./TenancyProvider";

export const createTenancyProvider = () => {
    return createProvider(Original => {
        return ({ children }) => {
            return (
                <TenancyProvider>
                    <Original>{children}</Original>
                </TenancyProvider>
            );
        };
    });
};
