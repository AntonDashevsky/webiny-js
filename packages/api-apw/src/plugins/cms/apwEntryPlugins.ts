import { type AdvancedPublishingWorkflow, ApwContentTypes } from "~/types.js";
import { fetchModel, getEntryTitle } from "./utils.js";
import { type HeadlessCms } from "@webiny/api-headless-cms/types/index.js";

interface ApwEntryPlugins {
    apw: AdvancedPublishingWorkflow;
    cms: HeadlessCms;
}
export const apwEntryPlugins = (params: ApwEntryPlugins) => {
    const { cms, apw } = params;

    apw.addContentGetter(ApwContentTypes.CMS_ENTRY, async (id, settings) => {
        const model = await fetchModel(cms, id, settings);

        const item = await cms.getEntry(model, {
            where: { OR: [{ id }, { entryId: id }], latest: true }
        });

        if (!item) {
            return null;
        }

        return {
            ...item,
            meta: {
                ...(item.meta || {})
            },
            title: getEntryTitle(model, item)
        };
    });

    apw.addContentPublisher(ApwContentTypes.CMS_ENTRY, async (id, settings) => {
        const model = await fetchModel(cms, id, settings);
        await cms.publishEntry(model, id);
        return true;
    });

    apw.addContentUnPublisher(ApwContentTypes.CMS_ENTRY, async (id, settings) => {
        const model = await fetchModel(cms, id, settings);
        await cms.unpublishEntry(model, id);
        return true;
    });
};
