import React from "react";
import { AdminConfig } from "@webiny/app-admin";
import { useRouter } from "@webiny/app/router.js";
import { ReactComponent as HeadlessCmsIcon } from "~/admin/icons/devices_other-black-24px.svg";
import { usePermission } from "~/admin/hooks/usePermission.js";
import { ContentGroupsMenuItems } from "./ContentGroupsMenuItems.js";
import { Routes } from "~/routes.js";

const { Menu } = AdminConfig;

interface ChildMenuProps {
    canAccess: boolean;
}

const CmsContentModelsMenu = ({ canAccess }: ChildMenuProps) => {
    const router = useRouter();

    if (!canAccess) {
        return null;
    }

    return (
        <Menu
            name={"headlessCMS.contentModels.models"}
            parent={"headlessCMS"}
            element={<Menu.Link text={"Models"} to={router.getLink(Routes.ContentModels.List)} />}
        />
    );
};

const CmsContentGroupsMenu = ({ canAccess }: ChildMenuProps) => {
    const router = useRouter();

    if (!canAccess) {
        return null;
    }
    return (
        <Menu
            name={"headlessCMS.contentModels.groups"}
            parent={"headlessCMS"}
            element={
                <Menu.Link text={"Groups"} to={router.getLink(Routes.ContentModelGroups.List)} />
            }
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
                    <Menu.Item
                        text={"Headless CMS"}
                        icon={
                            <Menu.Link.Icon label={"Headless CMS"} element={<HeadlessCmsIcon />} />
                        }
                    />
                }
            />

            {(canCreateContentModels || canCreateContentModelGroups) && (
                <>
                    <Menu
                        name={"headlessCMS.contentModels"}
                        parent={"headlessCMS"}
                        element={<Menu.Group text={"Content Models"} />}
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
