import React, { useRef } from "react";
import { ElementOverlays } from "./Overlays/ElementOverlays";
import { ConnectEditorToPreview } from "~/DocumentEditor/ConnectEditorToPreview";
import { Messenger } from "~/sdk/messenger";
import { useResponsiveContainer } from "~/BaseEditor/defaultConfig/Content/Preview/useResponsiveContainer";
import { OverlayLoader } from "@webiny/admin-ui";
import type { ViewportManager } from "~/sdk/ViewportManager";
import { useIframeUrl } from "~/BaseEditor/defaultConfig/Content/Preview/useIframeUrl";

interface IframeProps {
    showLoading: boolean;
    viewportManager: ViewportManager;
    onConnected: (messenger: Messenger) => void;
}

export const Iframe = React.memo((props: IframeProps) => {
    const iframeRef = useRef<HTMLIFrameElement>(null);
    const { iframeUrl } = useIframeUrl();
    const previewWidth = useResponsiveContainer(props.viewportManager);

    return (
        <div
            className={"wby-relative wby-flex wby-flex-col wby-items-center"}
            data-role={"responsive-container"}
        >
            {iframeUrl ? (
                <ConnectEditorToPreview iframeRef={iframeRef} onConnected={props.onConnected} />
            ) : null}
            {props.showLoading || !iframeUrl ? (
                <OverlayLoader
                    size="lg"
                    variant="accent"
                    text="Loading preview..."
                    className={"wby-bg-neutral-base"}
                />
            ) : null}
            {/* Height = viewport height - top bar - address bar - breadcrumbs. */}
            <div
                className="wby-min-h-[calc(100vh-43px-50px-31px)] wby-max-h-[calc(100vh-43px-50px)] wby-box-border  wby-overflow-hidden"
                style={{ width: previewWidth }}
            >
                <ElementOverlays />
                <iframe
                    id={"preview-iframe"}
                    className={
                        "wby-w-full wby-bg-white wby-border-none wby-overflow-scroll wby-min-h-[inherit]"
                    }
                    key={iframeUrl}
                    src={iframeUrl}
                    ref={iframeRef}
                    sandbox="allow-scripts allow-pointer-lock allow-same-origin allow-popups allow-modals allow-forms"
                />
            </div>
        </div>
    );
});

Iframe.displayName = "Iframe";
