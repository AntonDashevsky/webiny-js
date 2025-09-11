import React from "react";
import { WB_REDIRECT_LATEST_VISITED_FOLDER, WB_REDIRECT_LIST_ROUTE } from "~/constants.js";
import { NavigateFolderWithRouterProvider } from "@webiny/app-aco/contexts/navigateFolderWithRouter.js";

const createStorageKey = () => {
    return WB_REDIRECT_LATEST_VISITED_FOLDER;
};

const createListLink = () => {
    return WB_REDIRECT_LIST_ROUTE;
};

export const NavigateFolderProvider = ({ children }: { children: React.ReactNode }) => {
    return (
        <NavigateFolderWithRouterProvider
            createStorageKey={createStorageKey}
            createListLink={createListLink}
        >
            {children}
        </NavigateFolderWithRouterProvider>
    );
};
