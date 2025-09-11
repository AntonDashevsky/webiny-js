import React from "react";
import { SplitView, LeftPanel, RightPanel } from "@webiny/app-admin/components/SplitView";
import type { GroupsDataListProps } from "./GroupsDataList";
import { GroupsDataList } from "./GroupsDataList";
import type { GroupsFormProps } from "./GroupsForm";
import { GroupsForm } from "./GroupsForm";

export interface GroupsProps {
    listProps?: GroupsDataListProps;
    formProps?: GroupsFormProps;
}
export const Groups = ({ formProps = {}, listProps = {} }: GroupsProps) => {
    return (
        <SplitView>
            <LeftPanel>
                <GroupsDataList {...listProps} />
            </LeftPanel>
            <RightPanel>
                <GroupsForm {...formProps} />
            </RightPanel>
        </SplitView>
    );
};
