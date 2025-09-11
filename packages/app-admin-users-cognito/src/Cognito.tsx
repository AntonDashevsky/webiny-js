import React, { Fragment, memo } from "react";
import { Layout } from "@webiny/app-admin";
import { plugins } from "@webiny/plugins";
import { HasPermission } from "@webiny/app-security";
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
import { AdminConfig } from "@webiny/app-admin";

const { Route, Menu } = AdminConfig;
const ACCOUNT_ROUTE = "/account";

const CognitoIdP = (props: CognitoProps) => {
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
                        name={"cognito.users"}
                        path={"/admin-users"}
                        element={
                            <Layout title={"Admin Users"}>
                                <UsersView />
                            </Layout>
                        }
                    />

                    <Route
                        name={"cognito.account"}
                        path={ACCOUNT_ROUTE}
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
                        element={<Menu.Link text={"Users"} to={"/admin-users"} />}
                    />
                </HasPermission>

                <Menu.User name={"userInfo"} element={<UserInfo accountRoute={ACCOUNT_ROUTE} />} />
                <Menu.User
                    name={"accountSettings"}
                    element={<AccountDetails accountRoute={ACCOUNT_ROUTE} />}
                />
                <Menu.User name={"signOut"} element={<SignOut />} />
            </AdminConfig>
        </Fragment>
    );
};

export const Cognito = memo(CognitoIdP);
