import { useCallback } from "react";
import { type PbEditorElement, type PbEditorElementTree } from "~/types.js";
import { useEventActionHandler } from "~/editor/hooks/useEventActionHandler.js";
import { UpdateElementActionEvent } from "~/editor/recoil/actions/index.js";

interface UpdateOptions {
    history: boolean;
    debounce?: boolean;
    onFinish?: () => void;
}

export const useUpdateElement = () => {
    const handler = useEventActionHandler();

    return useCallback(
        (
            element: PbEditorElement | PbEditorElementTree,
            options: UpdateOptions = { history: true }
        ) => {
            handler.trigger(
                new UpdateElementActionEvent({
                    element,
                    ...options
                })
            );
        },
        [handler]
    );
};
