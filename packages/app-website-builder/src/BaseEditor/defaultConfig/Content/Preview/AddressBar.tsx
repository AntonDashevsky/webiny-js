import React, { useCallback, useState } from "react";
import { Input } from "@webiny/admin-ui";
import { useSelectFromEditor } from "~/BaseEditor/hooks/useSelectFromEditor";
import { useDocumentEditor } from "~/DocumentEditor";
import { BreakpointSelector } from "./BreakpointSelector";

export const AddressBar = () => {
    const editor = useDocumentEditor();

    const previewUrl = useSelectFromEditor<string>(state => {
        return state.previewUrl ?? "http://localhost:3000/page-1?wb.preview=true";
    });

    const [url, setUrl] = useState(previewUrl);

    const onChange = useCallback(
        (value: string) => {
            setUrl(value);
        },
        [setUrl]
    );

    const setPreviewUrl = useCallback(() => {
        editor.updateEditor(state => {
            state.previewUrl = url;
        });
    }, [editor, url]);

    return (
        <div className="wby-w-full wby-h-[49px] wby-flex wby-flex-row wby-p-sm wby-bg-neutral-base wby-border-solid wby-border-b-sm wby-border-neutral-dimmed">
            <div className={"wby-flex-auto wby-mr-sm"}>
                <Input
                    variant={"secondary"}
                    value={url}
                    size={"md"}
                    onChange={onChange}
                    onEnter={setPreviewUrl}
                />
            </div>
            <div className={"wby-flex-none"}>
                <BreakpointSelector />
            </div>
        </div>
    );
};
