import { Plugin } from "@webiny/plugins/Plugin.js";
import { ApwContentTypes } from "~/types.js";

export abstract class ContentApwSettingsPlugin extends Plugin {
    public static override type = "apw.contentApwSettings";

    public abstract canUse(type: ApwContentTypes): boolean;

    public abstract setWorkflowId(content: any, id: string | null): void;

    public abstract getWorkflowId(content: any): string | null;

    public abstract setContentReviewId(content: any, id: string | null): void;

    public abstract getContentReviewId(content: any): string | null;
}
