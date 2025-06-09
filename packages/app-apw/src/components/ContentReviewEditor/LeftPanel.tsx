import React from "react";
import styled from "@emotion/styled";
import { List } from "@webiny/ui/List/index.js";
import {
    type ApwContentReviewStatus,
    type ApwContentReviewStep,
    ApwContentReviewStepStatus,
    ApwWorkflowStepTypes,
    type CreatedBy
} from "~/types.js";
import { formatDate } from "~/utils.js";
import { PanelBox } from "./Styled.js";
import { ContentReviewStep } from "./ContentReviewStep/index.js";
import { ChangeContentStatus } from "./ChangeContentStatus/index.js";

const ReviewRequestedStepData = {
    id: "123",
    title: "Review requested",
    type: ApwWorkflowStepTypes.MANDATORY_BLOCKING,
    reviewers: [],
    pendingChangeRequests: 0,
    signOffProvidedOn: null,
    status: ApwContentReviewStepStatus.DONE
};

const ContentReviewStepList = styled(List)`
    flex: 1 0 0;
    padding: 0;
    overflow: auto;
`;

interface LeftPanelProps {
    steps: ApwContentReviewStep[];
    reviewRequestedOn: string;
    reviewRequestedBy: CreatedBy;
    status: ApwContentReviewStatus;
}

export const LeftPanel = ({ steps, reviewRequestedBy, reviewRequestedOn }: LeftPanelProps) => {
    return (
        <PanelBox flex={"1 1 26%"} display={"flex"} style={{ flexDirection: "column" }}>
            <ContentReviewStepList>
                <ContentReviewStep
                    disabled={true}
                    step={ReviewRequestedStepData}
                    createdOn={formatDate(reviewRequestedOn)}
                    createdBy={reviewRequestedBy}
                />
                {steps.map((step, index) => (
                    <ContentReviewStep
                        key={index}
                        step={step}
                        disabled={step.status === ApwContentReviewStepStatus.INACTIVE}
                    />
                ))}
            </ContentReviewStepList>
            <ChangeContentStatus />
        </PanelBox>
    );
};
