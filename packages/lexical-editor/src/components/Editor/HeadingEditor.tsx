import React from "react";
import type { RichTextEditorProps } from "~/components/Editor/RichTextEditor.js";
import { RichTextEditor } from "~/components/Editor/RichTextEditor.js";
import { Toolbar } from "~/components/Toolbar/Toolbar.js";
import { EnsureHeadingTagPlugin } from "~/components/Editor/EnsureHeadingTagPlugin.js";

interface HeadingEditorProps extends RichTextEditorProps {
    tag?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
}

const styles = { padding: 5 };

export const HeadingEditor = ({ tag, placeholder, ...rest }: HeadingEditorProps) => {
    return (
        <RichTextEditor
            toolbar={<Toolbar />}
            tag={tag ?? "h1"}
            placeholder={placeholder ?? "Enter your heading text here..."}
            {...rest}
            styles={styles}
        >
            <EnsureHeadingTagPlugin />
            {rest?.children}
        </RichTextEditor>
    );
};
