import React from "react";
import { observer } from "mobx-react-lite";
import { environment } from "~/sdk";
import { LiveElementSlot } from "./LiveElementSlot";
import { PreviewElementSlot } from "./PreviewElementSlot";

export interface ElementSlotProps {
    // Element that contains this slot.
    parentId: string;
    // Path to the array of elements within the element's data structure.
    slot: string;
    // IDs of the elements to render.
    elements: string[];
}

export const ElementSlot = observer((props: ElementSlotProps) => {
    const isPreview = environment.isPreview() && environment.isClient();

    if (isPreview) {
        return <PreviewElementSlot {...props} />;
    } else {
        return <LiveElementSlot {...props} />;
    }
});
