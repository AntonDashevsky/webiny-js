import { createCommand } from "~/editorSdk/createCommand";
import type { CreateElementParams } from "~/sdk/ElementFactory";

const CreateElement = createCommand<{
    // Name of the component to use.
    componentName: string;
    // Parent element for the new element.
    parentId: string;
    // Parent element slot (e.g., `children`, `heroBanner`, `tabsList.0.content`).
    slot: string;
    // Index within the slot.
    index: number;
    // Bindings
    bindings?: CreateElementParams["bindings"];
}>("CREATE_ELEMENT");

const MoveElement = createCommand<{
    // ID of the element to move.
    elementId: string;
    // Parent element for the new element.
    parentId: string;
    // Parent element slot (e.g., `children`, `heroBanner`, `tabsList.0.content`).
    slot: string;
    // Index within the slot.
    index: number;
}>("MOVE_ELEMENT");

const DeleteElement = createCommand<{
    id: string;
}>("DELETE_ELEMENT");

const SelectElement = createCommand<{ id: string }>("SELECT_ELEMENT");

const HighlightElement = createCommand<{ id: string }>("HIGHLIGHT_ELEMENT");

const DeselectElement = createCommand<never>("DESELECT_ELEMENT");

const PreviewPatchElement = createCommand<{ elementId: string; patch: any[] }>(
    "PREVIEW_PATCH_ELEMENT"
);

export const Commands = {
    CreateElement,
    DeleteElement,
    MoveElement,
    SelectElement,
    DeselectElement,
    HighlightElement,
    PreviewPatchElement
};
