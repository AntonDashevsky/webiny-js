import React from "react";
import { EditorConfig } from "~/BaseEditor";
import { TextInputRenderer } from "./TextInput";

export const ElementInputRenderers = () => {
    return (
        <>
            <EditorConfig.ElementInput.Renderer name={"Webiny/Text"} component={TextInputRenderer} />
        </>
    );
};
