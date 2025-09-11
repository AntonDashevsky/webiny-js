import React from "react";
import type { Decorator, GenericComponent } from "@webiny/app-admin";
import { Plugin } from "@webiny/app-admin";
import { FileManagerApiProvider } from "./FileManagerApiContext/index.js";
import { FileModelProvider } from "~/modules/FileManagerApiProvider/FileManagerApiContext/FileModelContext.js";

const fileManagerApiProvider: Decorator<
    GenericComponent<{ children: React.ReactNode }>
> = Original => {
    return function FileManager({ children }) {
        return (
            <FileModelProvider>
                <FileManagerApiProvider>
                    <Original>{children}</Original>
                </FileManagerApiProvider>
            </FileModelProvider>
        );
    };
};

export const FileManagerApiProviderModule = () => {
    return <Plugin providers={[fileManagerApiProvider]} />;
};
