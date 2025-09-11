import React from "react";
import { FloatingLinkEditorController } from "./FloatingLinkEditorController.js";
import type { LinkEditForm } from "./LinkEditForm.js";
import "./FloatingLinkEditorPlugin.css";

export function FloatingLinkEditorPlugin({
    anchorElem = () => document.body,
    ...props
}: {
    anchorElem?: () => HTMLElement;
    LinkEditForm?: typeof LinkEditForm;
}): JSX.Element | null {
    return (
        <FloatingLinkEditorController anchorElem={anchorElem} LinkEditForm={props.LinkEditForm} />
    );
}
