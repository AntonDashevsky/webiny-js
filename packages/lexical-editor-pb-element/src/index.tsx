import React from "react";
import { TypographyAction } from "@webiny/lexical-editor";
import { LexicalActiveHeadingRenderer } from "~/plugins/HeadingPlugin.js";
import { LexicalActiveParagraphRenderer } from "~/plugins/ParagraphPlugin.js";
import { RichVariableInputPlugin } from "~/plugins/elementSettings/variables/RichVariableInputPlugin.js";
import { TextVariableInputPlugin } from "~/plugins/elementSettings/variables/TextVariableInputPlugin.js";
import { CompositionScope } from "@webiny/react-composition";
import { TypographyDropDown } from "~/components/TypographyDropDown.js";
import { ParagraphEditorPreset } from "~/components/LexicalPresets/ParagraphEditorPreset.js";
import { HeadingEditorPreset } from "~/components/LexicalPresets/HeadingEditorPreset.js";

export * from "./LexicalEditor.js";

export const LexicalEditorPlugin = () => {
    return (
        <>
            <CompositionScope name={"pb.pageEditor"}>
                <CompositionScope name={"pb.paragraph"}>
                    <ParagraphEditorPreset />
                </CompositionScope>
                <CompositionScope name={"pb.heading"}>
                    <HeadingEditorPreset />
                </CompositionScope>
            </CompositionScope>
            <TypographyAction.TypographyDropDown element={<TypographyDropDown />} />
            {/* Block editor variables */}
            <RichVariableInputPlugin />
            <TextVariableInputPlugin />
            {/* PB Editor Active Element */}
            <LexicalActiveParagraphRenderer />
            <LexicalActiveHeadingRenderer />
        </>
    );
};
