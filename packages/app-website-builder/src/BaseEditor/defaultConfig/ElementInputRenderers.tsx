import React from "react";
import { EditorConfig } from "~/BaseEditor";
import { TextInputRenderer } from "~/inputRenderers/TextInput";
import { NumberInputRenderer } from "~/inputRenderers/NumberInput";
import { BooleanInputRenderer } from "~/inputRenderers/BooleanInput";
import { TextareaInputRenderer } from "~/inputRenderers/TextareaInput";
import { LexicalInputRenderer } from "~/inputRenderers/LexicalInput/LexicalInput";
import { DefaultLexicalConfig } from "~/inputRenderers/LexicalInput/DefaultLexicalConfig";
import { SlotInputRenderer } from "~/inputRenderers/SlotInput";
import { GridLayoutInputRenderer } from "~/inputRenderers/GridLayoutInput";
import { SelectInputRenderer } from "~/inputRenderers/SelectInput";
import { FileInputRenderer } from "~/inputRenderers/FileInput";

export const ElementInputRenderers = () => {
    return (
        <>
            <EditorConfig.ElementInput.Renderer
                name={"Webiny/Slot"}
                component={SlotInputRenderer}
            />
            <EditorConfig.ElementInput.Renderer
                name={"Webiny/Input"}
                component={TextInputRenderer}
            />
            <EditorConfig.ElementInput.Renderer
                name={"Webiny/Select"}
                component={SelectInputRenderer}
            />
            <EditorConfig.ElementInput.Renderer
                name={"Webiny/Textarea"}
                component={TextareaInputRenderer}
            />
            <EditorConfig.ElementInput.Renderer
                name={"Webiny/Number"}
                component={NumberInputRenderer}
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
            <EditorConfig.ElementInput.Renderer
                name={"Webiny/GridLayout"}
                component={GridLayoutInputRenderer}
            />
            <EditorConfig.ElementInput.Renderer
                name={"Webiny/FileManager"}
                component={FileInputRenderer}
            />
        </>
    );
};
