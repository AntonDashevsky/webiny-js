import React, { useCallback, useState } from "react";
import { css } from "emotion";
import styled from "@emotion/styled";
import { SplitView, LeftPanel, RightPanel } from "@webiny/app-admin/components/SplitView/index.js";
import { Typography } from "@webiny/ui/Typography/index.js";
import { Tabs, Tab } from "@webiny/ui/Tabs/index.js";
import { Icon } from "@webiny/ui/Icon/index.js";
import { EditTab } from "./Tabs/EditTab/index.js";
import { TriggersTab } from "./Tabs/TriggersTab/index.js";
import { PreviewTab } from "./Tabs/PreviewTab/index.js";
import { Fields } from "./Fields.js";

import { ReactComponent as FormIcon } from "./icons/round-assignment-24px.svg";

const ContentContainer = styled("div")({
    paddingTop: 65
});

const LeftBarTitle = styled("div")({
    borderBottom: "1px solid var(--mdc-theme-on-background)",
    display: "flex",
    alignItems: "center",
    padding: 25,
    color: "var(--mdc-theme-on-surface)"
});

const titleIcon = css({
    height: 24,
    marginRight: 15,
    color: "var(--mdc-theme-primary)"
});

const LeftBarFieldList = styled("div")({
    padding: 40,
    overflow: "auto",
    height: "calc(100vh - 250px)"
});

const formTabs = css({
    "&.webiny-ui-tabs": {
        ".webiny-ui-tabs__tab-bar": {
            backgroundColor: "var(--mdc-theme-surface)"
        }
    }
});
const EditorContent = () => {
    const [activeTab, setActiveTab] = useState(0);

    const onFieldDragStart = useCallback(() => {
        setActiveTab(0);
    }, []);

    return (
        <ContentContainer>
            <SplitView>
                <LeftPanel span={4}>
                    <LeftBarTitle>
                        <Icon className={titleIcon} icon={<FormIcon />} />
                        <Typography use={"headline6"}>Form Elements</Typography>
                    </LeftBarTitle>
                    <LeftBarFieldList>
                        <Fields onFieldDragStart={onFieldDragStart} />
                    </LeftBarFieldList>
                </LeftPanel>
                <RightPanel span={8}>
                    <Tabs className={formTabs} value={activeTab} onActivate={setActiveTab}>
                        <Tab label={"Edit"}>
                            <EditTab />
                        </Tab>
                        <Tab label={"Preview"}>
                            <PreviewTab />
                        </Tab>
                        <Tab label={"Triggers"}>
                            <TriggersTab />
                        </Tab>
                    </Tabs>
                </RightPanel>
            </SplitView>
        </ContentContainer>
    );
};

export default EditorContent;
