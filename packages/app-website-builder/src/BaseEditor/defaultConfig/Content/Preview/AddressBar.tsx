import React, { useEffect, useState } from "react";
import { Input } from "@webiny/admin-ui";
import { BreakpointSelector } from "./BreakpointSelector";
import { PreviewInNewTab } from "./AddressBar/PreviewInNewTab";
import { OpenInNewTab } from "./AddressBar/OpenInNewTab";
import { RefreshIframe } from "./AddressBar/RefreshIframe";
import { useGetWebsiteBuilderSettings } from "~/features";
import { useSelectFromDocument } from "~/BaseEditor/hooks/useSelectFromDocument";

export const AddressBar = () => {
    const path = useSelectFromDocument(document => {
        return document.properties.path;
    });

    const { getSettings } = useGetWebsiteBuilderSettings();
    const [addressBarUrl, setAddressBarUrl] = useState<string>("");

    useEffect(() => {
        getSettings().then(settings => {
            setAddressBarUrl(`${settings.previewDomain}${path}`);
        });
    }, [path]);

    return (
        <div className="wby-w-full wby-h-[49px] wby-flex wby-flex-row wby-p-sm wby-bg-neutral-base wby-border-solid wby-border-b-sm wby-border-neutral-dimmed">
            <div className={"wby-relative wby-flex-auto wby-mr-sm"}>
                <Input variant={"secondary"} value={addressBarUrl} disabled={true} size={"md"} />
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
