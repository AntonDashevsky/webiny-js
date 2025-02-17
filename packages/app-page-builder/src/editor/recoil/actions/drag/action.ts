import { DragEndActionEvent, DragStartActionEvent } from "./event.js";
import { EventActionCallable } from "~/types.js";

export const dragStartAction: EventActionCallable<DragStartActionEvent> = state => {
    return {
        state: {
            ...state,
            ui: {
                ...state.ui,
                isDragging: true
            }
        },
        actions: []
    };
};

export const dragEndAction: EventActionCallable<DragEndActionEvent> = state => {
    return {
        state: {
            ...state,
            ui: {
                ...state.ui,
                isDragging: false
            }
        },
        actions: []
    };
};
