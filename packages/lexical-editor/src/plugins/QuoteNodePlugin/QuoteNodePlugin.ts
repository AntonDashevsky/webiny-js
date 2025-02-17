import { useEffect } from "react";
import { QuoteNode } from "@webiny/lexical-nodes";
import { useQuote } from "~/hooks/useQuote.js";
import { useRichTextEditor } from "~/hooks/index.js";

export function QuotePlugin() {
    const { editor } = useRichTextEditor();
    useQuote(editor);

    useEffect(() => {
        if (!editor.hasNodes([QuoteNode])) {
            throw new Error("QuoteNodePlugin: QuoteNode is not registered in the editor!");
        }
    }, [editor]);

    return null;
}
