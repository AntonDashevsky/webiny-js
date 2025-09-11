import type { DragEndActionEvent, DragStartActionEvent } from "./event";
import type { EventActionCallable } from "~/types";

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
