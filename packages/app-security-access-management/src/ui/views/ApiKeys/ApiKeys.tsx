import * as React from "react";
import { SplitView, LeftPanel, RightPanel } from "@webiny/app-admin/components/SplitView/index.js";
import { useRoute } from "@webiny/react-router";
import { ApiKeysDataList } from "./ApiKeysDataList.js";
import { ApiKeyForm } from "./ApiKeyForm.js";
import { Routes } from "~/routes.js";

export const ApiKeys = () => {
    const route = useRoute(Routes.ApiKeys.List);

    return (
        <SplitView>
            <LeftPanel>
                <ApiKeysDataList activeId={route.params.id} />
            </LeftPanel>
            <RightPanel>
                <ApiKeyForm newEntry={route.params.new === true} id={route.params.id} />
            </RightPanel>
        </SplitView>
    );
};
