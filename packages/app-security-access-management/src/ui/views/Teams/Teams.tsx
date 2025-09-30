import React from "react";
import { TeamsDataList } from "./TeamsDataList.js";
import { TeamsForm } from "./TeamsForm.js";
import { SplitView, LeftPanel, RightPanel, useRoute } from "@webiny/app-admin";
import { Routes } from "~/routes.js";

export const Teams = () => {
    const { route } = useRoute(Routes.Roles.List);

    return (
        <SplitView>
            <LeftPanel>
                <TeamsDataList activeId={route.params.id} />
            </LeftPanel>
            <RightPanel>
                <TeamsForm newEntry={route.params.new === true} id={route.params.id} />
            </RightPanel>
        </SplitView>
    );
};
