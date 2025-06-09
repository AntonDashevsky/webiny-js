import React from "react";
import { SplitView, LeftPanel, RightPanel } from "@webiny/app-admin/components/SplitView/index.js";
import { TeamsDataList, type TeamsDataListProps } from "./TeamsDataList.js";
import { TeamsForm, type TeamsFormProps } from "./TeamsForm.js";

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
