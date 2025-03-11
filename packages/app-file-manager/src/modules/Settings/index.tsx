import React from "react";
import { plugins } from "@webiny/plugins";
import { Plugin } from "@webiny/app";
import { HasPermission } from "@webiny/app-security";
import { Layout } from "@webiny/app-admin";
import installation from "./plugins/installation";
import permissionRenderer from "./plugins/permissionRenderer";
import { FileManagerSettings } from "./views/FileManagerSettings";
import { AdminConfig } from "@webiny/app-admin";
import { RouterConfig } from "@webiny/app/config/RouterConfig";

const { Menu, Route } = AdminConfig;

export const SettingsModule = () => {
    plugins.register(installation, permissionRenderer);

    return (
        <Plugin>
            <HasPermission name={"fm.settings"}>
                <RouterConfig>
                    <Route
                        name={"settings.fm.general"}
                        path={"/settings/file-manager/general"}
                        element={
                            <Layout title={"File Manager - General Settings"}>
                                <FileManagerSettings />
                            </Layout>
                        }
                    />
                </RouterConfig>
                <Menu
                    parent={"settings"}
                    name={"settings.fm"}
                    element={<Menu.Item label={"File Manager"} />}
                />
                <Menu
                    parent={"settings"}
                    name={"settings.fm.general"}
                    element={
                        <Menu.Item label={"General"} path={"/settings/file-manager/general"} />
                    }
                />
            </HasPermission>
        </Plugin>
    );
};
