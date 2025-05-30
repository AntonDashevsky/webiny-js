import React, { useRef } from "react";
import { ElementOverlays } from "./Overlays/ElementOverlays";
import { useSelectFromEditor } from "~/BaseEditor/hooks/useSelectFromEditor";
import { ConnectEditorToPreview } from "~/DocumentEditor/ConnectEditorToPreview";
import { Messenger } from "~/sdk/messenger";
import { useResponsiveContainer } from "~/BaseEditor/defaultConfig/Content/Preview/useResponsiveContainer";
import { OverlayLoader } from "@webiny/admin-ui";
import type { ViewportManager } from "~/sdk/ViewportManager";

interface IframeProps {
    viewportManager: ViewportManager;
    onConnected: (messenger: Messenger) => void;
}

export const Iframe = React.memo((props: IframeProps) => {
    const iframeRef = useRef<HTMLIFrameElement>(null);

    const previewWidth = useResponsiveContainer(props.viewportManager);

    const previewUrl = useSelectFromEditor<string>(state => {
        const iframeUrl =
            "http://localhost:3000/page-1?preview.document=page&preview.page=/page-1:12345678";
        return state.previewUrl ?? iframeUrl;
    });

    return (
        <div
            className={"wby-relative wby-flex wby-flex-col wby-items-center"}
            data-role={"responsive-container"}
        >
            <ConnectEditorToPreview
                iframeRef={iframeRef}
                onConnected={props.onConnected}
                loader={<OverlayLoader size="lg" variant="accent" text="Loading preview..." />}
            />
            <div
                className="wby-min-h-[calc(100vh-44px-50px)] wby-max-h-[calc(100vh-44px-50px)] wby-box-border  wby-overflow-hidden"
                style={{ width: previewWidth }}
            >
                <ElementOverlays />
                <iframe
                    id={"preview-iframe"}
                    className={
                        "wby-w-full wby-bg-white wby-border-none wby-overflow-scroll wby-min-h-[inherit]"
                    }
                    src={previewUrl}
                    ref={iframeRef}
                    sandbox="allow-scripts allow-pointer-lock allow-same-origin allow-popups allow-modals allow-forms"
                />
            </div>
        </div>
    );
});

Iframe.displayName = "Iframe";
