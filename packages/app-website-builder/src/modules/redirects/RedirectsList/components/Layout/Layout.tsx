import React from "react";
import { LeftPanel, RightPanel, SplitView } from "@webiny/app-admin";
import { useLayoutId } from "~/modules/redirects/RedirectsList/components/Layout/useLayoutId.js";
import { WB_REDIRECTS_APP } from "~/constants.js";

interface LayoutProps {
    main: React.ReactNode;
    sidebar: React.ReactNode;
}

const Layout = (props: LayoutProps) => {
    const layoutId = useLayoutId(WB_REDIRECTS_APP);

    return (
        <SplitView layoutId={layoutId}>
            <LeftPanel span={2}>{props.sidebar}</LeftPanel>
            <RightPanel span={10}>{props.main}</RightPanel>
        </SplitView>
    );
};

export { Layout, type LayoutProps };
