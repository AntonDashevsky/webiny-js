import { EventActionCallable } from "~/types.js";
import { MoveElementActionArgsType } from "./types.js";
import { updateElementAction } from "~/editor/recoil/actions/index.js";
import { addElementToParent, removeElementFromParent } from "~/editor/helpers.js";
import { executeAction } from "~/editor/recoil/eventActions/index.js";

const defaultReturn = {
    actions: []
};

export const moveElementAction: EventActionCallable<MoveElementActionArgsType> = async (
    state,
    meta,
    args
) => {
    if (!args) {
        return defaultReturn;
    }
    const { source, target } = args;

    const sourceElement = await state.getElementById(source.id);
    if (!sourceElement) {
        throw new Error(`There is no element with id "${source.id}"`);
    }

    if (!sourceElement.parent) {
        return defaultReturn;
    }

    const sourceParent = await state.getElementById(sourceElement.parent);
    const removedSource = executeAction(state, meta, updateElementAction, {
        element: removeElementFromParent(sourceParent, sourceElement.id),
        history: false
    });

    let targetElement = await state.getElementById(target.id);
    if (!targetElement) {
        throw new Error(`There is no element with id "${target.id}"`);
    }

    if (targetElement.id === sourceElement.parent) {
        targetElement = (removedSource.state.elements || {})[targetElement.id];
    }

    const addToParent = executeAction(
        { ...state, elements: removedSource.state.elements },
        meta,
        updateElementAction,
        {
            element: addElementToParent(sourceElement, targetElement, target.position),
            history: true
        }
    );

    return addToParent;
};
