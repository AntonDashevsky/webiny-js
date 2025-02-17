import React from "react";
import { Cell, Grid } from "@webiny/ui/Grid/index.js";
import { leftPanel } from "@webiny/app-admin/components/SplitView/SplitView.js";
import { restGridStyles } from "../publishingWorkflows/components/Styled.js";
import { ContentReviewDataList } from "./ContentReviewDataList.js";

interface LayoutCenterProps {
    children: React.ReactNode;
}

const LayoutCenter = ({ children }: LayoutCenterProps) => {
    return (
        <Grid className={restGridStyles}>
            <Cell span={3} />
            <Cell span={6} className={leftPanel}>
                {children}
            </Cell>
            <Cell span={3} />
        </Grid>
    );
};

export function ContentReviewDashboard() {
    return (
        <LayoutCenter>
            <ContentReviewDataList />
        </LayoutCenter>
    );
}
