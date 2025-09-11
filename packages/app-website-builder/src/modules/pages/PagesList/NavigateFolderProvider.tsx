import React from "react";
import { WB_PAGE_LATEST_VISITED_FOLDER, WB_PAGES_LIST_ROUTE } from "~/constants";
import { NavigateFolderWithRouterProvider } from "@webiny/app-aco/contexts/navigateFolderWithRouter.js";

const createStorageKey = () => {
    return WB_PAGE_LATEST_VISITED_FOLDER;
};

const createListLink = () => {
    return WB_PAGES_LIST_ROUTE;
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
