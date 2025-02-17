import React from "react";
import { SplitView, LeftPanel, RightPanel } from "@webiny/app-admin/components/SplitView/index.js";
import PublishingWorkflowsDataList from "./PublishingWorkflowsDataList.js";
import PublishingWorkflowForm from "./PublishingWorkflowForm.js";

export const PublishingWorkflowsView = () => {
    return (
        <SplitView>
            <LeftPanel>
                <PublishingWorkflowsDataList />
            </LeftPanel>
            <RightPanel>
                <PublishingWorkflowForm />
            </RightPanel>
        </SplitView>
    );
};
