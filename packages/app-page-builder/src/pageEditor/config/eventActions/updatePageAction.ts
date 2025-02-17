import { SaveRevisionActionEvent } from "./saveRevision/index.js";
import { UpdateDocumentActionArgsType } from "~/editor/recoil/actions/updateDocument/types.js";
import { PageAtomType } from "~/pageEditor/state/index.js";
import { PageEventActionCallable } from "~/pageEditor/types.js";

export const updatePageAction: PageEventActionCallable<
    UpdateDocumentActionArgsType<PageAtomType>
> = (state, _, args) => {
    return {
        state: {
            page: {
                ...state.page,
                ...(args?.document || {})
            }
        },
        actions: [
            new SaveRevisionActionEvent({
                debounce: args?.debounce ?? true,
                onFinish: args?.onFinish
            })
        ]
    };
};
