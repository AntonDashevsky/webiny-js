import React from "react";
import { EditorConfig } from "~/BaseEditor";
import { TextInputRenderer } from "~/inputRenderers/TextInput";
import { BooleanInputRenderer } from "~/inputRenderers/BooleanInput";
import { TextareaInputRenderer } from "~/inputRenderers/TextareaInput";
import { LexicalInputRenderer } from "~/inputRenderers/LexicalInput/LexicalInput";
import { DefaultLexicalConfig } from "~/inputRenderers/LexicalInput/DefaultLexicalConfig";

export const ElementInputRenderers = () => {
    return (
        <>
            <EditorConfig.ElementInput.Renderer
                name={"Webiny/Input"}
                component={TextInputRenderer}
            />
            <EditorConfig.ElementInput.Renderer
                name={"Webiny/Textarea"}
                component={TextareaInputRenderer}
            />
            {/* Configure Lexical Editor*/}
            <DefaultLexicalConfig />
            <EditorConfig.ElementInput.Renderer
                name={"Webiny/Lexical"}
                component={LexicalInputRenderer}
            />
            <EditorConfig.ElementInput.Renderer
                name={"Webiny/Switch"}
                component={BooleanInputRenderer}
            />
        </>
    );
};
