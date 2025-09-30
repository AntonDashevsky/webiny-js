import React, { Fragment, memo } from "react";
import { AdminConfig, Layout } from "@webiny/app-admin";
import { plugins } from "@webiny/plugins";
import { HasPermission } from "@webiny/app-security";
import { useRouter } from "@webiny/app-admin";
import { Permission } from "~/plugins/constants.js";
import { UsersView } from "~/ui/views/Users/UsersView.js";
import { Account } from "~/ui/views/Account/index.js";
import { AccountDetails } from "./plugins/userMenu/AccountDetails.js";
import { UserInfo } from "./plugins/userMenu/UserInfo.js";
import { SignOut } from "./plugins/userMenu/SignOut.js";
import installation from "./plugins/installation.js";
import permissionRenderer from "./plugins/permissionRenderer/index.js";
import cognito from "./plugins/cognito.js";
import type { CognitoProps } from "./CognitoLogin.js";
import { CognitoLogin } from "./CognitoLogin.js";
import { Routes } from "~/routes.js";

const { Route, Menu } = AdminConfig;

const CognitoIdP = (props: CognitoProps) => {
    const { getLink } = useRouter();

    plugins.register([installation, permissionRenderer, cognito()]);

    return (
        <Fragment>
            <CognitoLogin
                config={props.config}
                userMenuItems={{ userInfo: false, signOut: false }}
            />
            <AdminConfig>
                <HasPermission name={Permission.Users}>
                    <Route
                        route={Routes.Users.List}
                        element={
                            <Layout title={"Admin Users"}>
                                <UsersView />
                            </Layout>
                        }
                    />

                    <Route
                        route={Routes.Users.Account}
                        element={
                            <Layout title={"User Account"}>
                                <Account />
                            </Layout>
                        }
                    />

                    <Menu
                        name={"cognito.settings"}
                        parent={"settings"}
                        element={<Menu.Group text={"Admin Users"} />}
                    />
                    <Menu
                        name={"cognito.settings.adminUsers"}
                        parent={"settings"}
                        element={<Menu.Link text={"Users"} to={getLink(Routes.Users.List)} />}
                    />
                </HasPermission>

                <Menu.User
                    name={"userInfo"}
                    element={<UserInfo accountRoute={getLink(Routes.Users.Account)} />}
                />
                <Menu.User
                    name={"accountSettings"}
                    element={<AccountDetails accountRoute={getLink(Routes.Users.Account)} />}
                />
                <Menu.User name={"signOut"} element={<SignOut />} />
            </AdminConfig>
        </Fragment>
    );
};

export const Cognito = memo(CognitoIdP);
