import React from "react";
import { CompositionScope, DialogsProvider } from "@webiny/app-admin";
import { AcoWithConfig, NavigateFolderProvider } from "@webiny/app-aco";
import { useRoute, useRouter } from "@webiny/react-router";
import { AdminLayout } from "@webiny/app-admin/components/AdminLayout.js";
import { FoldersProvider } from "@webiny/app-aco/contexts/folders.js";
import { PagesList } from "./PagesList/PagesList.js";
import { WB_PAGE_APP } from "~/constants.js";
import { PageListWithConfig } from "./configs/index.js";
import { WB_PAGE_LATEST_VISITED_FOLDER } from "~/constants.js";
import { Routes } from "~/routes.js";

const createStorageKey = () => {
    return WB_PAGE_LATEST_VISITED_FOLDER;
};

export const PageList = () => {
    const router = useRouter();
    const route = useRoute(Routes.Pages.List);

    const navigateToFolder = (folderId: string) => {
        router.goToRoute(Routes.Pages.List, { folderId });
    };

    return (
        <CompositionScope name={"wbPage"}>
            <AdminLayout title={"Pages - Website Builder"}>
                <PageListWithConfig>
                    <AcoWithConfig>
                        <FoldersProvider type={WB_PAGE_APP}>
                            <NavigateFolderProvider
                                folderId={route.params.folderId}
                                createStorageKey={createStorageKey}
                                navigateToFolder={navigateToFolder}
                            >
                                <DialogsProvider>
                                    <PagesList />
                                </DialogsProvider>
                            </NavigateFolderProvider>
                        </FoldersProvider>
                    </AcoWithConfig>
                </PageListWithConfig>
            </AdminLayout>
        </CompositionScope>
    );
};
