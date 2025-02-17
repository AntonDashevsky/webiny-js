import React from "react";
import { SplitView, LeftPanel, RightPanel } from "@webiny/app-admin/components/SplitView/index.js";
import MenusDataList from "./MenusDataList.js";
import MenusForm from "./MenusForm.js";
import { useMenusPermissions } from "~/hooks/permissions/index.js";

const Menus = () => {
    const { canCreate } = useMenusPermissions();
    return (
        <SplitView>
            <LeftPanel span={3}>
                <MenusDataList canCreate={canCreate()} />
            </LeftPanel>
            <RightPanel span={9}>
                <MenusForm canCreate={canCreate()} />
            </RightPanel>
        </SplitView>
    );
};

export default Menus;
