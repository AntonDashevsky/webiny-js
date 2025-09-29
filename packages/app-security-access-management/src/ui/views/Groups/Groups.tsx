import React from "react";
import { SplitView, LeftPanel, RightPanel } from "@webiny/app-admin/components/SplitView/index.js";
import { GroupsDataList } from "./GroupsDataList.js";
import { GroupsForm } from "./GroupsForm.js";
import { useRoute } from "@webiny/react-router";
import { Routes } from "~/routes.js";

export const Groups = () => {
    const route = useRoute(Routes.Roles.List);

    return (
        <SplitView>
            <LeftPanel>
                <GroupsDataList activeId={route.params.id} />
            </LeftPanel>
            <RightPanel>
                <GroupsForm newEntry={route.params.new === true} id={route.params.id} />
            </RightPanel>
        </SplitView>
    );
};
