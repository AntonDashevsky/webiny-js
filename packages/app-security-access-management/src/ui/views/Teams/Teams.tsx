import React from "react";
import { SplitView, LeftPanel, RightPanel } from "@webiny/app-admin/components/SplitView";
import type { TeamsDataListProps } from "./TeamsDataList";
import { TeamsDataList } from "./TeamsDataList";
import type { TeamsFormProps } from "./TeamsForm";
import { TeamsForm } from "./TeamsForm";

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
