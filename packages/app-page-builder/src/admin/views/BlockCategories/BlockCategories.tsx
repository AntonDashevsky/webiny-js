import React from "react";
import { SplitView, LeftPanel, RightPanel } from "@webiny/app-admin/components/SplitView/index.js";
import BlockCategoriesDataList from "./BlockCategoriesDataList.js";
import BlockCategoriesForm from "./BlockCategoriesForm.js";
import { useBlockCategoriesPermissions } from "~/hooks/permissions/index.js";

const BlockCategories = () => {
    const { canCreate } = useBlockCategoriesPermissions();

    return (
        <SplitView>
            <LeftPanel>
                <BlockCategoriesDataList canCreate={canCreate()} />
            </LeftPanel>
            <RightPanel>
                <BlockCategoriesForm canCreate={canCreate()} />
            </RightPanel>
        </SplitView>
    );
};

export default BlockCategories;
