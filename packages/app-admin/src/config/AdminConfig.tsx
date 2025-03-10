import React from "react";
import { createConfigurableComponent } from "@webiny/react-properties";
import { Menu, type MenuConfig } from "./AdminConfig/Menu";
import { Route, type RouteConfig } from "./AdminConfig/Route";
import { Theme } from "./AdminConfig/Theme";
import { createProvider } from "@webiny/app";
import { withStaticProps } from "@webiny/admin-ui";

const base = createConfigurableComponent<AdminConfig>("AdminConfig");

export const AdminWithConfig = Object.assign(base.WithConfig, {
    displayName: "AdminWithConfig"
});

interface AdminConfig {
    menus: MenuConfig[];
    routes: RouteConfig[];
}

function useAdminConfig() {
    return base.useConfig();
}

export const AdminConfigProvider = createProvider(Original => {
    return function AdminConfigProvider({ children }) {
        return (
            <AdminWithConfig>
                <Original>{children}</Original>
            </AdminWithConfig>
        );
    };
});

export const AdminConfig = withStaticProps(base.Config, {
    Theme,
    Menu,
    Route,
    use: useAdminConfig
});
