import React from "react";
import classSet from "classnames";
import "./Editor.scss";
import DragPreview from "./DragPreview";
import { EditorConfig, EditorWithConfig } from "../config";

export const Editor = () => {
    const classes = {
        "pb-editor": true,
        "pb-editor-dragging": false,
        "pb-editor-resizing": false
    };
    return (
        <div className={classSet("wby-w-full", classes)}>
            <EditorWithConfig>
                <EditorConfig.Ui.Layout />
            </EditorWithConfig>
            <DragPreview />
        </div>
    );
};
