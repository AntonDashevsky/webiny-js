import React from "react";
import type { RichTextEditorProps } from "@webiny/ui/RichTextEditor";
import { RichTextEditor as UiRichTextEditor } from "@webiny/ui/RichTextEditor";
import { FileManager } from "~/components";

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
