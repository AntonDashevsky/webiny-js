import React, { useEffect, useState } from "react";
import { useEventActionHandler } from "~/editor/hooks/useEventActionHandler.js";
import { saveBlockAction, SaveBlockActionEvent } from "./saveBlock/index.js";
import { UpdateDocumentActionEvent } from "~/editor/recoil/actions/index.js";
import { type BlockEditorEventActionCallableState } from "~/blockEditor/types.js";
import { Prompt } from "@webiny/react-router";

export const EventActionHandlers = () => {
    const eventActionHandler = useEventActionHandler<BlockEditorEventActionCallableState>();
    const [isDirty, setDirty] = useState(false);

    useEffect(() => {
        const offSaveBlockAction = eventActionHandler.on(SaveBlockActionEvent, (...args) => {
            setDirty(false);
            return saveBlockAction(...args);
        });

        const offUpdateBlockAction = eventActionHandler.on(
            UpdateDocumentActionEvent,
            async (state, _, args) => {
                setDirty(true);
                return {
                    state: {
                        block: {
                            ...state.block,
                            ...(args?.document || {})
                        }
                    },
                    actions: []
                };
            }
        );

        return () => {
            offSaveBlockAction();
            offUpdateBlockAction();
        };
    }, []);

    return (
        <Prompt
            when={isDirty}
            message="There are some unsaved changes! Are you sure you want to navigate away and discard all changes?"
        />
    );
};
