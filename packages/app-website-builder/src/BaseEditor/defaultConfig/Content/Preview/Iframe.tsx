import React, { useRef } from "react";
import { ElementOverlays } from "./Overlays/ElementOverlays";
import { ConnectEditorToPreview } from "~/DocumentEditor/ConnectEditorToPreview";
import { Messenger } from "~/sdk/messenger";
import { useResponsiveContainer } from "~/BaseEditor/defaultConfig/Content/Preview/useResponsiveContainer";
import { OverlayLoader } from "@webiny/admin-ui";
import type { ViewportManager } from "~/sdk/ViewportManager";
import { useSelectFromDocument } from "~/BaseEditor/hooks/useSelectFromDocument";
import { useEditorPreviewUrl } from "~/BaseEditor/defaultConfig/Content/Preview/useEditorPreviewUrl";

interface IframeProps {
    showLoading: boolean;
    viewportManager: ViewportManager;
    onConnected: (messenger: Messenger) => void;
}

export const Iframe = React.memo((props: IframeProps) => {
    const iframeRef = useRef<HTMLIFrameElement>(null);
    const { previewUrl } = useEditorPreviewUrl();
    const previewWidth = useResponsiveContainer(props.viewportManager);

    const iframeSrc = useSelectFromDocument(
        document => {
            if (!previewUrl) {
                return undefined;
            }

            const url = new URL(previewUrl);
            url.searchParams.set("width", previewWidth);
            const searchParams = url.searchParams;
            searchParams.set("wb.editing", "true");
            searchParams.set("wb.type", document.metadata.documentType);
            searchParams.set("wb.id", document.id);
            searchParams.set("wb.path", url.pathname);
            searchParams.set("wb.referrer", window.location.origin);

            return url.toString();
        },
        [previewUrl]
    );

    return (
        <div
            className={"wby-relative wby-flex wby-flex-col wby-items-center"}
            data-role={"responsive-container"}
        >
            {iframeSrc ? (
                <ConnectEditorToPreview iframeRef={iframeRef} onConnected={props.onConnected} />
            ) : null}
            {props.showLoading ? (
                <OverlayLoader
                    size="lg"
                    variant="accent"
                    text="Loading preview..."
                    className={"wby-bg-neutral-base"}
                />
            ) : null}
            <div
                className="wby-min-h-[calc(100vh-43px-50px)] wby-max-h-[calc(100vh-43px-50px)] wby-box-border  wby-overflow-hidden"
                style={{ width: previewWidth }}
            >
                <ElementOverlays />
                <iframe
                    id={"preview-iframe"}
                    className={
                        "wby-w-full wby-bg-white wby-border-none wby-overflow-scroll wby-min-h-[inherit]"
                    }
                    key={iframeSrc}
                    src={iframeSrc}
                    ref={iframeRef}
                    sandbox="allow-scripts allow-pointer-lock allow-same-origin allow-popups allow-modals allow-forms"
                />
            </div>
        </div>
    );
});

Iframe.displayName = "Iframe";
