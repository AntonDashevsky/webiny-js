import React from "react";
import { FloatingLinkEditorController } from "./FloatingLinkEditorController";
import type { LinkEditForm } from "./LinkEditForm";
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
