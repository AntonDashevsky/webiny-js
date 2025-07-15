import React, { useCallback, useMemo, useState } from "react";
import { Input } from "@webiny/admin-ui";
import { useDocumentEditor } from "~/DocumentEditor";
import { BreakpointSelector } from "./BreakpointSelector";
import { useEditorPreviewUrl } from "./useEditorPreviewUrl";
import { PreviewInNewTab } from "./AddressBar/PreviewInNewTab";
import { OpenInNewTab } from "./AddressBar/OpenInNewTab";
import { RefreshIframe } from "./AddressBar/RefreshIframe";

export const AddressBar = () => {
    const editor = useDocumentEditor();
    const { previewUrl, setPreviewUrl: setEditorPreviewUrl } = useEditorPreviewUrl();

    const addressBarUrl = useMemo(() => {
        if (!previewUrl) {
            return "";
        }

        const url = new URL(previewUrl);
        Array.from(url.searchParams.keys()).forEach(key => {
            if (key.startsWith("wb.")) {
                url.searchParams.delete(key);
            }
        });
        return url.toString();
    }, [previewUrl]);

    const [urlInput, setInputUrl] = useState<string | null>(null);

    const onChange = useCallback(
        (value: string) => {
            setInputUrl(value);
        },
        [setInputUrl]
    );

    const setPreviewUrl = useCallback(() => {
        if (urlInput) {
            setEditorPreviewUrl(urlInput);
            setInputUrl(null);
        }
    }, [editor, urlInput]);

    return (
        <div className="wby-w-full wby-h-[49px] wby-flex wby-flex-row wby-p-sm wby-bg-neutral-base wby-border-solid wby-border-b-sm wby-border-neutral-dimmed">
            <div className={"wby-relative wby-flex-auto wby-mr-sm"}>
                <Input
                    variant={"secondary"}
                    value={urlInput ?? addressBarUrl}
                    size={"md"}
                    onChange={onChange}
                    onEnter={setPreviewUrl}
                    onBlur={setPreviewUrl}
                />
                <div className={"wby-absolute wby-right-0 wby-top-0"}>
                    <RefreshIframe />
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
