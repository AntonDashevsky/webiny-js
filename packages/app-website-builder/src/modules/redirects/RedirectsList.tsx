import React from "react";
import {
    useRoute,
    useRouter,
    AdminLayout,
    CompositionScope,
    DialogsProvider
} from "@webiny/app-admin";
import { AcoWithConfig, NavigateFolderProvider } from "@webiny/app-aco";
import { FoldersProvider } from "@webiny/app-aco/contexts/folders.js";
import { DocumentList } from "./RedirectsList/DocumentList.js";
import { WB_REDIRECT_LATEST_VISITED_FOLDER, WB_REDIRECTS_APP } from "~/constants.js";
import { RedirectListWithConfig } from "~/modules/redirects/configs/index.js";
import { Routes } from "~/routes.js";

const createStorageKey = () => {
    return WB_REDIRECT_LATEST_VISITED_FOLDER;
};

export const RedirectsList = () => {
    const router = useRouter();
    const { route } = useRoute(Routes.Redirects.List);

    const navigateToFolder = (folderId: string) => {
        router.goToRoute(Routes.Redirects.List, { folderId });
    };
    return (
        <CompositionScope name={"wbRedirect"}>
            <AdminLayout title={"Redirects - Website Builder"}>
                <RedirectListWithConfig>
                    <AcoWithConfig>
                        <FoldersProvider type={WB_REDIRECTS_APP}>
                            <NavigateFolderProvider
                                folderId={route.params.folderId}
                                navigateToFolder={navigateToFolder}
                                createStorageKey={createStorageKey}
                            >
                                <DialogsProvider>
                                    <DocumentList />
                                </DialogsProvider>
                            </NavigateFolderProvider>
                        </FoldersProvider>
                    </AcoWithConfig>
                </RedirectListWithConfig>
            </AdminLayout>
        </CompositionScope>
    );
};
