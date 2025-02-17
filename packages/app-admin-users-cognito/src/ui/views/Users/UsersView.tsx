import React from "react";
import { SplitView, LeftPanel, RightPanel } from "@webiny/app-admin/components/SplitView/index.js";
import { UsersFormView } from "~/ui/views/Users/UsersFormView.js";
import UsersDataList from "~/ui/views/Users/UsersDataList.js";
import { UIViewComponent } from "@webiny/app-admin/ui/UIView.js";
import { useWcp } from "@webiny/app-admin";

export const UsersView = () => {
    const { getProject } = useWcp();

    const project = getProject();
    let teams = false;
    if (project) {
        teams = project.package.features.advancedAccessControlLayer.options.teams;
    }

    return (
        <SplitView>
            <LeftPanel>
                <UsersDataList />
            </LeftPanel>
            <RightPanel>
                <UIViewComponent view={new UsersFormView({ teams })} />
            </RightPanel>
        </SplitView>
    );
};
