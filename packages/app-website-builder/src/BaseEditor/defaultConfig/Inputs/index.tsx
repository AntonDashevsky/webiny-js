import React from "react";
import { EditorConfig } from "~/BaseEditor";
import { TextInputRenderer } from "./TextInput";
import { TagsInputRenderer } from "./TagsInput";
import { BooleanInputRenderer } from "./BooleanInput";

export const ElementInputRenderers = () => {
    return (
        <>
            <EditorConfig.ElementInput.Renderer name={"Webiny/Input"} component={TextInputRenderer} />
            <EditorConfig.ElementInput.Renderer name={"Webiny/Textarea"} component={TextInputRenderer} />
            <EditorConfig.ElementInput.Renderer name={"Webiny/Lexical"} component={TextInputRenderer} />
            <EditorConfig.ElementInput.Renderer name={"Webiny/Tags"} component={TagsInputRenderer} />
            <EditorConfig.ElementInput.Renderer name={"Webiny/Switch"} component={BooleanInputRenderer} />
        </>
    );
};
