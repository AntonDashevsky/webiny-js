import type { EventActionCallable } from "~/types";
import { flattenElements } from "~/editor/helpers";
import type { UpdateElementActionArgsType } from "./types";
import { UpdateDocumentActionEvent } from "~/editor/recoil/actions/updateDocument";

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
