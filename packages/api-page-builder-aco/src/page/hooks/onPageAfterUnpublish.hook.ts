import WebinyError from "@webiny/error";

import { updatePageRecordPayload } from "~/utils/createRecordPayload.js";

import { type PbAcoContext, type PbPageRecordData } from "~/types.js";
import { PB_PAGE_TYPE } from "~/contants.js";

export const onPageAfterUnpublishHook = (context: PbAcoContext) => {
    const { aco, pageBuilder } = context;

    const app = aco.getApp(PB_PAGE_TYPE);
    /**
     * Intercept page un-publish event and update the related search record.
     */
    pageBuilder.onPageAfterUnpublish.subscribe(async ({ page }) => {
        try {
            const payload = await updatePageRecordPayload(context, page);
            await app.search.update<PbPageRecordData>(page.pid, payload);
        } catch (error) {
            throw WebinyError.from(error, {
                message: "Error while executing onPageAfterUnpublishHook hook",
                code: "ACO_AFTER_PAGE_UNPUBLISH_HOOK"
            });
        }
    });
};
