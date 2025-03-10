import React, { memo } from "react";
import { plugins } from "@webiny/plugins";
import { AddRoute, Layout, Plugins, useWcp } from "@webiny/app-admin";
import { HasPermission } from "@webiny/app-security";
import { Permission } from "~/plugins/constants";
import { Groups } from "~/ui/views/Groups";
import { Teams } from "~/ui/views/Teams";
import { ApiKeys } from "~/ui/views/ApiKeys";
import accessManagementPlugins from "./plugins";
import { AdminConfig } from "@webiny/app-admin";

const { Menu } = AdminConfig;

/**
 * TODO @ts-refactor
 * Find out why is there empty default export
 */
export default () => [];

export const AccessManagementExtension = () => {
    plugins.register(accessManagementPlugins());

    const { getProject } = useWcp();

    const project = getProject();
    let teams = false;
    if (project) {
        teams = project.package.features.advancedAccessControlLayer.options.teams;
    }

    return (
        <Plugins>
            <HasPermission name={Permission.Groups}>
                <AddRoute exact path={"/access-management/roles"}>
                    <Layout title={"Access Management - Roles"}>
                        <Groups />
                    </Layout>
                </AddRoute>
            </HasPermission>{" "}
            {teams && (
                <HasPermission name={Permission.Teams}>
                    <AddRoute exact path={"/access-management/teams"}>
                        <Layout title={"Access Management - Teams"}>
                            <Teams />
                        </Layout>
                    </AddRoute>
                </HasPermission>
            )}
            <HasPermission name={Permission.ApiKeys}>
                <AddRoute exact path={"/access-management/api-keys"}>
                    <Layout title={"Access Management - API Keys"}>
                        <ApiKeys />
                    </Layout>
                </AddRoute>
            </HasPermission>
            <HasPermission any={[Permission.Groups, Permission.ApiKeys, Permission.Teams]}>
                <Menu
                    name={"security.settings"}
                    parent={"settings"}
                    element={<Menu.Item label={"Access Management"} />}
                />

                <HasPermission name={Permission.Groups}>
                    <Menu
                        name={"security.roles"}
                        parent={"settings"}
                        element={<Menu.Item label={"Roles"} path={"/access-management/roles"} />}
                    />
                </HasPermission>
                {teams && (
                    <HasPermission name={Permission.Teams}>
                        <Menu
                            name={"security.teams"}
                            parent={"settings"}
                            element={
                                <Menu.Item label={"Teams"} path={"/access-management/teams"} />
                            }
                        />
                    </HasPermission>
                )}

                <HasPermission name={Permission.ApiKeys}>
                    <Menu
                        name={"security.apiKeys"}
                        parent={"settings"}
                        element={
                            <Menu.Item label={"API Keys"} path={"/access-management/api-keys"} />
                        }
                    />
                </HasPermission>
            </HasPermission>
        </Plugins>
    );
};

export const AccessManagement = memo(AccessManagementExtension);
