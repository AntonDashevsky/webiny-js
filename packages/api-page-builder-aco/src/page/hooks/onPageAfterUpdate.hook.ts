import WebinyError from "@webiny/error";

import { updatePageRecordPayload } from "~/utils/createRecordPayload.js";

import { type PbAcoContext, type PbPageRecordData } from "~/types.js";
import { PB_PAGE_TYPE } from "~/contants.js";

export const onPageAfterUpdateHook = (context: PbAcoContext) => {
    const { aco, pageBuilder } = context;

    const app = aco.getApp(PB_PAGE_TYPE);
    /**
     * Intercept page update event and update the related search record.
     */
    pageBuilder.onPageAfterUpdate.subscribe(async ({ page }) => {
        try {
            const payload = await updatePageRecordPayload(context, page);
            await app.search.update<PbPageRecordData>(page.pid, payload);
        } catch (error) {
            throw WebinyError.from(error, {
                message: "Error while executing onPageAfterUpdateHook hook",
                code: "ACO_AFTER_PAGE_UPDATE_HOOK"
            });
        }
    });
};
