import React from "react";
import { SplitView, LeftPanel, RightPanel } from "@webiny/app-admin/components/SplitView/index.js";
import CategoriesDataList from "./CategoriesDataList.js";
import CategoriesForm from "./CategoriesForm.js";
import { useCategoriesPermissions } from "~/hooks/permissions/index.js";

const Categories = () => {
    const { canCreate } = useCategoriesPermissions();

    return (
        <SplitView>
            <LeftPanel>
                <CategoriesDataList canCreate={canCreate()} />
            </LeftPanel>
            <RightPanel>
                <CategoriesForm canCreate={canCreate()} />
            </RightPanel>
        </SplitView>
    );
};

export default Categories;
