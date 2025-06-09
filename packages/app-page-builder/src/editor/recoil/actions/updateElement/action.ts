import { type EventActionCallable } from "~/types.js";
import { flattenElements } from "~/editor/helpers.js";
import { type UpdateElementActionArgsType } from "./types.js";
import { UpdateDocumentActionEvent } from "~/editor/recoil/actions/updateDocument/index.js";

export const updateElementAction: EventActionCallable<UpdateElementActionArgsType> = (
    _state,
    _meta,
    args
) => {
    if (!args) {
        return {
            actions: []
        };
    }

    const { element, onFinish, debounce, history } = args;
    const actions = [];

    if (history) {
        actions.push(new UpdateDocumentActionEvent({ onFinish, debounce, history }));
    }

    const flattenedContent = flattenElements(element);

    return {
        state: {
            elements: flattenedContent
        },
        actions
    };
};
