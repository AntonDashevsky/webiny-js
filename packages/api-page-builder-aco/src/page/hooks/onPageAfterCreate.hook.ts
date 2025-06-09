import WebinyError from "@webiny/error";

import { createPageRecordPayload } from "~/utils/createRecordPayload.js";

import { type PbAcoContext, type PbPageRecordData } from "~/types.js";
import { PB_PAGE_TYPE } from "~/contants.js";

export const onPageAfterCreateHook = (context: PbAcoContext) => {
    const { aco, pageBuilder } = context;
    const app = aco.getApp(PB_PAGE_TYPE);

    /**
     * Intercept page creation and create a new search record.
     * The `location.folderId` info is coming from transient `meta` data.
     */
    pageBuilder.onPageAfterCreate.subscribe(async ({ page, meta }) => {
        try {
            const payload = await createPageRecordPayload(context, page, meta);
            await app.search.create<PbPageRecordData>(payload);
        } catch (error) {
            throw WebinyError.from(error, {
                message: "Error while executing onPageAfterCreateHook hook",
                code: "ACO_AFTER_PAGE_CREATE_HOOK"
            });
        }
    });
};
