import { ContextPlugin } from "@webiny/api";
import type { ApwContext, PageWithWorkflow } from "~/types";
import { ApwContentTypes } from "~/types";

export const apwContentPagePlugins = () =>
    new ContextPlugin<ApwContext>(async context => {
        const { apw, pageBuilder } = context;

        apw.addContentGetter(ApwContentTypes.PAGE, async id => {
            return pageBuilder.getPage<PageWithWorkflow>(id);
        });

        apw.addContentPublisher(ApwContentTypes.PAGE, async id => {
            await pageBuilder.publishPage<PageWithWorkflow>(id);
            return true;
        });

        apw.addContentUnPublisher(ApwContentTypes.PAGE, async id => {
            await pageBuilder.unpublishPage<PageWithWorkflow>(id);
            return true;
        });
    });
