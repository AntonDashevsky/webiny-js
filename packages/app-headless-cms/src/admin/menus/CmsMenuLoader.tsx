// @ts-nocheck test
import React, { Fragment } from "react";
import { ReactComponent as HeadlessCmsIcon } from "~/admin/icons/devices_other-black-24px.svg";
import usePermission from "~/admin/hooks/usePermission";
import { ContentGroupsMenuItems } from "./ContentGroupsMenuItems";
import { AdminConfig } from "@webiny/app-admin";

const { Menu } = AdminConfig;

interface ChildMenuProps {
    canAccess: boolean;
}

const CmsContentModelsMenu = ({ canAccess }: ChildMenuProps) => {
    if (!canAccess) {
        return null;
    }

    return (
        <Menu
            name={"headlessCMS.contentModels.models"}
            parent={"headlessCMS"}
            element={<Menu.Item label={"Models"} path={"/cms/content-models"} />}
        />
    );
};

const CmsContentGroupsMenu = ({ canAccess }: ChildMenuProps) => {
    if (!canAccess) {
        return null;
    }
    return (
        <Menu
            name={"headlessCMS.contentModels.groups"}
            parent={"headlessCMS"}
            element={<Menu.Item label={"Groups"} path={"/cms/content-model-groups"} />}
        />
    );
};

const CmsMenuLoaderComponent = () => {
    const {
        canAccessManageEndpoint,
        canReadContentModels,
        canReadContentModelGroups,
        canCreateContentModels,
        canCreateContentModelGroups
    } = usePermission();

    const hasAccess =
        canAccessManageEndpoint && (canReadContentModels || canReadContentModelGroups);

    if (!hasAccess) {
        return null;
    }

    return (
        <>
            <Menu
                name={"headlessCMS"}
                after={"home"}
                element={
                    <Menu.Item label={"Headless CMS"} icon={<HeadlessCmsIcon />} path={"asd"} />
                }
            />

            {(canCreateContentModels || canCreateContentModelGroups) && (
                <>
                    <Menu
                        name={"headlessCMS.contentModels"}
                        parent={"headlessCMS"}
                        element={<Menu.Item label={"Content Models"} />}
                    />

                    <CmsContentModelsMenu canAccess={canCreateContentModels} />
                    <CmsContentGroupsMenu canAccess={canCreateContentModelGroups} />
                </>
            )}
            <ContentGroupsMenuItems />
        </>
    );
};

export const CmsMenuLoader: React.ComponentType = React.memo(CmsMenuLoaderComponent);

CmsMenuLoader.displayName = "CmsMenuLoader";
