import { type ToggleSaveRevisionStateActionArgsType } from "./types.js";
import { type PageEventActionCallable } from "~/pageEditor/types.js";

export const toggleSaveRevisionStateAction: PageEventActionCallable<
    ToggleSaveRevisionStateActionArgsType
> = (state, _, args) => {
    if (!args) {
        return {
            actions: []
        };
    }
    return {
        state: {
            ui: {
                ...state.ui,
                isSaving: args.saving
            }
        },
        actions: []
    };
};
