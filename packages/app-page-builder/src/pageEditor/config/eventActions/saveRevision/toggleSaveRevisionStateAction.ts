import type { ToggleSaveRevisionStateActionArgsType } from "./types";
import type { PageEventActionCallable } from "~/pageEditor/types";

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
