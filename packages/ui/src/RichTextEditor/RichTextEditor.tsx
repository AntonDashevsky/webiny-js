import React from "react";
import {
    RichTextEditor as AdminRichTextEditor,
    type RichTextEditorProps as AdminRichTextEditorProps,
    type RichTextEditorValue,
    type OnReadyParams
} from "@webiny/admin-ui";
import type { FormComponentProps } from "~/types.js";

type RichTextEditorProps = FormComponentProps &
    AdminRichTextEditorProps & {
        readOnly?: boolean;
    };

/**
 * @deprecated This component is deprecated and will be removed in future releases.
 * Please find out the new `RichTextEditor` component props from the `@webiny/admin-ui` package instead.
 */
const RichTextEditor = ({ readOnly, ...props }: RichTextEditorProps) => {
    return <AdminRichTextEditor disabled={readOnly} {...props} />;
};

export { RichTextEditor, type RichTextEditorProps, type RichTextEditorValue, type OnReadyParams };
