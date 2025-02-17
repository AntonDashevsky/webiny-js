import { useEffect } from "react";
import { useEventActionHandler } from "~/editor/hooks/useEventActionHandler.js";
import {
    saveRevisionAction,
    SaveRevisionActionEvent,
    toggleSaveRevisionStateAction,
    ToggleSaveRevisionStateActionEvent
} from "./saveRevision/index.js";
import { updatePageAction } from "./updatePageAction.js";
import { UpdateDocumentActionEvent } from "~/editor/recoil/actions/index.js";
import { PageEditorEventActionCallableState } from "~/pageEditor/types.js";

export const EventActionHandlers = () => {
    const eventActionHandler = useEventActionHandler<PageEditorEventActionCallableState>();

    useEffect(() => {
        const offSaveRevisionAction = eventActionHandler.on(
            SaveRevisionActionEvent,
            saveRevisionAction
        );

        const offToggleSaveRevisionStateAction = eventActionHandler.on(
            ToggleSaveRevisionStateActionEvent,
            toggleSaveRevisionStateAction
        );

        const offUpdatePageAction = eventActionHandler.on(
            UpdateDocumentActionEvent,
            updatePageAction
        );

        return () => {
            offSaveRevisionAction();
            offToggleSaveRevisionStateAction();
            offUpdatePageAction();
        };
    }, []);
    return null;
};
