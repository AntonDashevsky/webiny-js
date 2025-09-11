import React, { useMemo, useRef } from "react";
import { ElementOverlays } from "./Overlays/ElementOverlays.js";
import { ConnectEditorToPreview } from "~/DocumentEditor/ConnectEditorToPreview.js";
import type { Messenger } from "@webiny/website-builder-sdk";
import { useResponsiveContainer } from "~/BaseEditor/defaultConfig/Content/Preview/useResponsiveContainer.js";
import { OverlayLoader } from "@webiny/admin-ui";
import type { ViewportManager } from "@webiny/website-builder-sdk";
import { observer } from "mobx-react-lite";

interface IframeProps {
    url: string;
    timestamp: number;
    showLoading: boolean;
    viewportManager: ViewportManager;
    onConnected: (messenger: Messenger) => void;
}

export const Iframe = observer(({ url, timestamp, ...props }: IframeProps) => {
    const iframeRef = useRef<HTMLIFrameElement>(null);
    const previewWidth = useResponsiveContainer(props.viewportManager);

    const iframeUrl = useMemo(() => {
        const localUrl = new URL(url);
        localUrl.searchParams.set("wb.ts", timestamp.toString());
        return localUrl.toString();
    }, [url, timestamp]);

    return (
        <div
            key={iframeUrl}
            className={"wby-relative wby-flex wby-flex-col wby-items-center"}
            data-role={"responsive-container"}
        >
            <ConnectEditorToPreview iframeRef={iframeRef} onConnected={props.onConnected} />
            {props.showLoading ? (
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
                        "wby-w-full wby-bg-white wby-border-none wby-overflow-scroll wby-min-h-[inherit] wby-pointer-events-none"
                    }
                    src={iframeUrl}
                    ref={iframeRef}
                    sandbox="allow-scripts allow-pointer-lock allow-same-origin allow-popups allow-modals allow-forms"
                />
            </div>
        </div>
    );
});

Iframe.displayName = "Iframe";
