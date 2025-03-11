import React, { Fragment } from "react";
import { createProviderPlugin } from "@webiny/app-admin";
import { RMWCProvider } from "@rmwc/provider";
import { Layout } from "./modules/Layout";
import { Navigation } from "./modules/Navigation";
import { UserMenu } from "~/modules/UserMenu";
import { Overlays } from "./modules/Overlays";
import { NotFound } from "./modules/NotFound";
import { Dashboard } from "./modules/Dashboard";

const RMWCProviderPlugin = createProviderPlugin(Component => {
    return function RMWCThemeProvider({ children }) {
        return (
            <RMWCProvider ripple={false}>
                <Component>{children}</Component>
            </RMWCProvider>
        );
    };
});

export const RMWC = () => {
    return (
        <Fragment>
            <RMWCProviderPlugin />
            <Layout />
            <Dashboard />
            <NotFound />
            <Navigation />
            <UserMenu />
            <Overlays />
        </Fragment>
    );
};
