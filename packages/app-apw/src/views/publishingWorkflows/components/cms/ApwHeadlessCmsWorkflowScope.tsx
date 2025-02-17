import React from "react";
import dotPropImmutable from "dot-prop-immutable";
import isEmpty from "lodash/isEmpty.js";
import { CmsScopeSettings } from "./CmsScopeSettings.js";
import { i18n } from "@webiny/app/i18n/index.js";
import { ApwWorkflowApplications, ApwWorkflowScopeTypes } from "~/types.js";
import { Box, Stack } from "~/components/Layout.js";
import { validation } from "@webiny/validation";
import { Select } from "@webiny/ui/Select/Select.js";
import { HigherOrderComponent } from "@webiny/app-admin";
import { WorkflowScopeProps } from "~/views/publishingWorkflows/components/WorkflowScope.js";

const t = i18n.ns("app-apw/admin/publishing-workflows/form/cms");

const HeadlessCmsWorkflowScope = (props: WorkflowScopeProps) => {
    const { Bind, workflow } = props;
    const { scope } = workflow;
    const noEntries = isEmpty(dotPropImmutable.get(scope, "data.entries"));
    const noModels = isEmpty(dotPropImmutable.get(scope, "data.models"));
    return (
        <Stack space={6}>
            <Box>
                <Bind name={`scope.type`} validators={validation.create("required")}>
                    <Select label={"Type"} box={"true"}>
                        <option value={""} disabled={true} hidden={true} />
                        <option value={ApwWorkflowScopeTypes.DEFAULT}>{t`Everything`}</option>
                        <option
                            value={ApwWorkflowScopeTypes.CUSTOM}
                        >{t`Specific models and entries`}</option>
                    </Select>
                </Bind>
            </Box>
            <Box>
                {scope.type === ApwWorkflowScopeTypes.CUSTOM && (
                    <CmsScopeSettings Bind={Bind} runValidation={noEntries && noModels} />
                )}
            </Box>
        </Stack>
    );
};

export const ApwHeadlessCmsWorkflowScope: HigherOrderComponent<
    WorkflowScopeProps
> = WorkflowScope => {
    return function ApwHeadlessCmsWorkflowScope(props) {
        if (props.workflow.app !== ApwWorkflowApplications.CMS) {
            return <WorkflowScope {...props} />;
        }
        return <HeadlessCmsWorkflowScope {...props} />;
    };
};
