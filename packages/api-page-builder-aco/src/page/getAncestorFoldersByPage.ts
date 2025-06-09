import get from "lodash/get.js";
import WebinyError from "@webiny/error";

import { type PbAcoContext, type PbPageRecordData } from "~/types.js";
import { type Page } from "@webiny/api-page-builder/types.js";
import { PB_PAGE_TYPE } from "~/contants.js";

export const getAncestorFoldersByPage = async (context: PbAcoContext, page: Page) => {
    try {
        const { aco } = context;
        const app = aco.getApp(PB_PAGE_TYPE);

        const record = await app.search.get<PbPageRecordData>(page.pid);
        const folderId = get(record, "location.folderId");

        if (!folderId) {
            return [];
        }

        return aco.folder.getFolderWithAncestors(folderId);
    } catch (error) {
        throw WebinyError.from(error, {
            message: "Error while executing getAncestorFoldersByPage",
            code: "ACO_GET_ANCESTOR_FOLDERS_BY_PAGE"
        });
    }
};
