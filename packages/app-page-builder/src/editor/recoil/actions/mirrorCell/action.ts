import { cloneElement, UpdateElementActionEvent } from "../index.js";
import { type EventActionCallable, type PbEditorElement } from "~/types.js";
import { type MirrorCellActionArgsType } from "./types.js";

export const mirrorCellAction: EventActionCallable<MirrorCellActionArgsType> = async (
    state,
    _,
    args
) => {
    if (!args) {
        return {
            actions: []
        };
    }
    const { element } = args;
    if (!element.parent) {
        return {
            actions: []
        };
    }
    const parent = await state.getElementById(element.parent);

    const newElement: PbEditorElement = {
        ...parent,
        elements: await Promise.all(
            parent.elements.map(async () => await cloneElement(state, element))
        )
    };

    return {
        state: {},
        actions: [
            new UpdateElementActionEvent({
                element: newElement,
                history: true,
                triggerUpdateElementTree: true
            })
        ]
    };
};
