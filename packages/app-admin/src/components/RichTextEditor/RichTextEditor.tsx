import React from "react";
import { RichTextEditor as UiRichTextEditor, RichTextEditorProps } from "@webiny/ui/RichTextEditor/index.js";
import { FileManager } from "~/components/index.js";

export const RichTextEditor = (props: RichTextEditorProps) => {
    return (
        <FileManager>
            {({ showFileManager }) => (
                <UiRichTextEditor
                    {...props}
                    placeholder={props.placeholder || "Click here to type"}
                    context={{ ...props.context, showFileManager }}
                />
            )}
        </FileManager>
    );
};
