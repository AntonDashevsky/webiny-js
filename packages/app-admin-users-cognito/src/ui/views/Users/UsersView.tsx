import React from "react";
import { LeftPanel, RightPanel, SplitView } from "@webiny/app-admin/components/SplitView/index.js";
import { UsersFormView } from "~/ui/views/Users/UsersFormView.js";
import UsersDataList from "~/ui/views/Users/UsersDataList.js";
import { UIViewComponent } from "@webiny/app-admin/ui/UIView.js";
import { useWcp } from "@webiny/app-admin";
import { IfNotExternalUser } from "./components/IfNotExternalUser.js";

export const UsersView = () => {
    const wcp = useWcp();

    const teams = wcp.canUseTeams();

    return (
        <SplitView>
            <LeftPanel>
                <UsersDataList />
            </LeftPanel>
            <RightPanel>
                <IfNotExternalUser>
                    <UIViewComponent view={new UsersFormView({ teams })} />
                </IfNotExternalUser>
            </RightPanel>
        </SplitView>
    );
};
