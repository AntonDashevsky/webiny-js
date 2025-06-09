import { type Topic } from "@webiny/pubsub/types.js";
import { type OnEntryBeforeCreateTopicParams, type CmsContext } from "~/types/index.js";
import { markLockedFields } from "./markLockedFields.js";

interface AssignBeforeEntryCreateParams {
    context: CmsContext;
    onEntryBeforeCreate: Topic<OnEntryBeforeCreateTopicParams>;
}
export const assignBeforeEntryCreate = (params: AssignBeforeEntryCreateParams) => {
    const { context, onEntryBeforeCreate } = params;

    onEntryBeforeCreate.subscribe(async params => {
        const { entry, model } = params;

        await markLockedFields({
            model,
            entry,
            context
        });
    });
};
