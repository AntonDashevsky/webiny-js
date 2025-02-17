import { Topic } from "@webiny/pubsub/types.js";
import { OnEntryBeforeUpdateTopicParams, CmsContext } from "~/types/index.js";
import { markLockedFields } from "./markLockedFields.js";

interface AssignBeforeEntryUpdateParams {
    context: CmsContext;
    onEntryBeforeUpdate: Topic<OnEntryBeforeUpdateTopicParams>;
}
export const assignBeforeEntryUpdate = (params: AssignBeforeEntryUpdateParams) => {
    const { context, onEntryBeforeUpdate } = params;

    onEntryBeforeUpdate.subscribe(async params => {
        const { entry, model } = params;

        await markLockedFields({
            model,
            entry,
            context
        });
    });
};
