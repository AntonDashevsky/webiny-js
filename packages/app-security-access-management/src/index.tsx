import React, { memo } from "react";
import { plugins } from "@webiny/plugins";
import { Layout, Plugins, useWcp } from "@webiny/app-admin";
import { HasPermission } from "@webiny/app-security";
import { Permission } from "~/plugins/constants";
import { Groups } from "~/ui/views/Groups";
import { Teams } from "~/ui/views/Teams";
import { ApiKeys } from "~/ui/views/ApiKeys";
import accessManagementPlugins from "./plugins";
import { AdminConfig } from "@webiny/app-admin";
import { RouterConfig } from "@webiny/app/config/RouterConfig";

const { Route } = RouterConfig;
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
                <RouterConfig>
                    <Route
                        name={"security.groups"}
                        exact
                        path={"/access-management/roles"}
                        element={
                            <Layout title={"Access Management - Roles"}>
                                <Groups />
                            </Layout>
                        }
                    />
                </RouterConfig>
            </HasPermission>
            {teams && (
                <HasPermission name={Permission.Teams}>
                    <RouterConfig>
                        <Route
                            name={"security.teams"}
                            exact
                            path={"/access-management/teams"}
                            element={
                                <Layout title={"Access Management - Teams"}>
                                    <Teams />
                                </Layout>
                            }
                        />
                    </RouterConfig>
                </HasPermission>
            )}
            <HasPermission name={Permission.ApiKeys}>
                <RouterConfig>
                    <Route
                        name={"security.apiKeys"}
                        exact
                        path={"/access-management/api-keys"}
                        element={
                            <Layout title={"Access Management - API Keys"}>
                                <ApiKeys />
                            </Layout>
                        }
                    />
                </RouterConfig>
            </HasPermission>
            <HasPermission any={[Permission.Groups, Permission.ApiKeys, Permission.Teams]}>
                <AdminConfig>
                    <Menu
                        name={"security.settings"}
                        parent={"settings"}
                        element={<Menu.Item label={"Access Management"} />}
                    />
                </AdminConfig>

                <HasPermission name={Permission.Groups}>
                    <AdminConfig>
                        <Menu
                            name={"security.roles"}
                            parent={"settings"}
                            element={
                                <Menu.Item label={"Roles"} path={"/access-management/roles"} />
                            }
                        />
                    </AdminConfig>
                </HasPermission>
                {teams && (
                    <HasPermission name={Permission.Teams}>
                        <AdminConfig>
                            <Menu
                                name={"security.teams"}
                                parent={"settings"}
                                element={
                                    <Menu.Item label={"Teams"} path={"/access-management/teams"} />
                                }
                            />
                        </AdminConfig>
                    </HasPermission>
                )}

                <HasPermission name={Permission.ApiKeys}>
                    <AdminConfig>
                        <Menu
                            name={"security.apiKeys"}
                            parent={"settings"}
                            element={
                                <Menu.Item
                                    label={"API Keys"}
                                    path={"/access-management/api-keys"}
                                />
                            }
                        />
                    </AdminConfig>
                </HasPermission>
            </HasPermission>
        </Plugins>
    );
};

export const AccessManagement = memo(AccessManagementExtension);
