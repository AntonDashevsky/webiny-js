import React from "react";
import { CompositionScope, DialogsProvider } from "@webiny/app-admin";
import { AcoWithConfig } from "@webiny/app-aco";
import { AdminLayout } from "@webiny/app-admin/components/AdminLayout.js";
import { FoldersProvider } from "@webiny/app-aco/contexts/folders.js";
import { DocumentList } from "./RedirectsList/DocumentList.js";
import { WB_REDIRECTS_APP } from "~/constants.js";
import { NavigateFolderProvider } from "~/modules/redirects/RedirectsList/NavigateFolderProvider";
import { RedirectListWithConfig } from "~/modules/redirects/configs";

export const RedirectsList = () => {
    return (
        <CompositionScope name={"wbRedirect"}>
            <AdminLayout title={"Redirects - Website Builder"}>
                <RedirectListWithConfig>
                    <AcoWithConfig>
                        <FoldersProvider type={WB_REDIRECTS_APP}>
                            <NavigateFolderProvider>
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
