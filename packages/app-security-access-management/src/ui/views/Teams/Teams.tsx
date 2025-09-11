import React from "react";
import { SplitView, LeftPanel, RightPanel } from "@webiny/app-admin/components/SplitView/index.js";
import type { TeamsDataListProps } from "./TeamsDataList.js";
import { TeamsDataList } from "./TeamsDataList.js";
import type { TeamsFormProps } from "./TeamsForm.js";
import { TeamsForm } from "./TeamsForm.js";

export interface TeamsProps {
    listProps?: TeamsDataListProps;
    formProps?: TeamsFormProps;
}
export const Teams = ({ formProps = {}, listProps = {} }: TeamsProps) => {
    return (
        <SplitView>
            <LeftPanel>
                <TeamsDataList {...listProps} />
            </LeftPanel>
            <RightPanel>
                <TeamsForm {...formProps} />
            </RightPanel>
        </SplitView>
    );
};
