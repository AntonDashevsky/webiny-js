import React from "react";
import { SplitView, LeftPanel, RightPanel } from "@webiny/app-admin/components/SplitView/index.js";
import LocalesDataList from "./LocalesDataList.js";
import LocaleForm from "./LocaleForm.js";

export const LocalesView = () => {
    return (
        <SplitView>
            <LeftPanel>
                <LocalesDataList />
            </LeftPanel>
            <RightPanel>
                <LocaleForm />
            </RightPanel>
        </SplitView>
    );
};
