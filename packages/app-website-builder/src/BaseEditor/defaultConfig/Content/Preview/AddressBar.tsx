import React, { useCallback, useState } from "react";
import { Input } from "@webiny/admin-ui";
import { useDocumentEditor } from "~/DocumentEditor";
import { BreakpointSelector } from "./BreakpointSelector";
import { useEditorPreviewUrl } from "~/BaseEditor/defaultConfig/Content/Preview/useEditorPreviewUrl";
import { PreviewInNewTab } from "./AddressBar/PreviewInNewTab";
import { OpenInNewTab } from "./AddressBar/OpenInNewTab";

export const AddressBar = () => {
    const editor = useDocumentEditor();
    const { previewUrl } = useEditorPreviewUrl();

    const [urlInput, setInputUrl] = useState<string | null>(null);

    const onChange = useCallback(
        (value: string) => {
            setInputUrl(value);
        },
        [setInputUrl]
    );

    const setPreviewUrl = useCallback(() => {
        if (urlInput) {
            editor.updateDocument(state => {
                state.metadata.lastPreviewUrl = urlInput;
            });
            setInputUrl(null);
        }
    }, [editor, urlInput]);

    return (
        <div className="wby-w-full wby-h-[49px] wby-flex wby-flex-row wby-p-sm wby-bg-neutral-base wby-border-solid wby-border-b-sm wby-border-neutral-dimmed">
            <div className={"wby-relative wby-flex-auto wby-mr-sm"}>
                <Input
                    variant={"secondary"}
                    value={urlInput ?? previewUrl}
                    size={"md"}
                    onChange={onChange}
                    onEnter={setPreviewUrl}
                    onBlur={setPreviewUrl}
                />
                <div className={"wby-absolute wby-right-0 wby-top-0"}>
                    <PreviewInNewTab />
                    <OpenInNewTab />
                </div>
            </div>
            <div className={"wby-flex-none"}>
                <BreakpointSelector />
            </div>
        </div>
    );
};
