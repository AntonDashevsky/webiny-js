import { ContentApwSettingsPlugin } from "~/ContentApwSettingsPlugin.js";
import { type CmsEntry } from "@webiny/api-headless-cms/types/index.js";
import { ApwContentTypes } from "~/types.js";
import set from "lodash/set.js";

export class CmsEntryApwSettingsGetterPlugin extends ContentApwSettingsPlugin {
    public override canUse(type: ApwContentTypes): boolean {
        return type === ApwContentTypes.CMS_ENTRY;
    }

    public override setWorkflowId(entry: CmsEntry, id: string | null) {
        entry.meta = set(entry.meta || {}, "apw.workflowId", id);
    }

    public override getWorkflowId(entry: CmsEntry): string | null {
        if (!entry.meta) {
            return null;
        }
        return entry.meta.apw?.workflowId || null;
    }

    public override setContentReviewId(entry: CmsEntry, id: string | null) {
        entry.meta = set(entry.meta || {}, "apw.contentReviewId", id);
    }
    public override getContentReviewId(entry: CmsEntry): string | null {
        if (!entry.meta) {
            return null;
        }
        return entry.meta.apw?.contentReviewId || null;
    }
}
