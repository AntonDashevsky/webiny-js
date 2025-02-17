import React from "react";
import { createProvider } from "@webiny/app";
import { ThemeLoader as ThemeLoaderComponent } from "~/components/ThemeLoader.js";
import { ThemeSource } from "~/types.js";

interface ThemeLoaderParams {
    themes: ThemeSource[];
}

export const createThemeLoader = ({ themes }: ThemeLoaderParams) => {
    return createProvider(PrevProvider => {
        return function ThemeLoaderProvider({ children }) {
            return (
                <ThemeLoaderComponent themes={themes}>
                    <PrevProvider>{children}</PrevProvider>
                </ThemeLoaderComponent>
            );
        };
    });
};
