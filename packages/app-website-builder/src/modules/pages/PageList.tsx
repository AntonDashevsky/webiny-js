import React from "react";
import { CompositionScope, DialogsProvider } from "@webiny/app-admin";
import { AcoWithConfig } from "@webiny/app-aco";
import { PagesList } from "./PagesList/PagesList.js";
import { AdminLayout } from "@webiny/app-admin/components/AdminLayout.js";
import { FoldersProvider } from "@webiny/app-aco/contexts/folders.js";
import { WB_PAGE_APP } from "~/constants.js";
import { NavigateFolderProvider } from "~/modules/pages/PagesList/NavigateFolderProvider";
import { PageListWithConfig } from "./configs/index.js";

export const PageList = () => {
    return (
        <CompositionScope name={"wbPage"}>
            <AdminLayout title={"Pages - Website Builder"}>
                <PageListWithConfig>
                    <AcoWithConfig>
                        <FoldersProvider type={WB_PAGE_APP}>
                            <NavigateFolderProvider>
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
