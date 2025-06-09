import React, { useMemo } from "react";
import { useSecurity } from "@webiny/app-security";
import { SplitView, LeftPanel, RightPanel } from "@webiny/app-admin/components/SplitView/index.js";
import ContentModelGroupsDataList from "./ContentModelGroupsDataList.js";
import ContentModelGroupsForm from "./ContentModelGroupsForm.js";
import { type CmsSecurityPermission } from "~/types.js";

const ContentModelGroups = () => {
    const { identity, getPermission } = useSecurity();

    const canCreate = useMemo((): boolean => {
        const permission = getPermission<CmsSecurityPermission>("cms.contentModelGroup");
        if (!permission) {
            return false;
        }

        if (typeof permission.rwd !== "string") {
            return true;
        }

        return permission.rwd.includes("w");
    }, [identity]);

    return (
        <SplitView>
            <LeftPanel span={4}>
                <ContentModelGroupsDataList canCreate={canCreate} />
            </LeftPanel>
            <RightPanel span={8}>
                <ContentModelGroupsForm canCreate={canCreate} />
            </RightPanel>
        </SplitView>
    );
};

export default ContentModelGroups;
