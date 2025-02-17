import React, { Fragment } from "react";
import { createProviderPlugin } from "@webiny/app-admin";
import { RMWCProvider } from "@rmwc/provider";

import { Layout } from "./modules/Layout.js";
import { Navigation } from "./modules/Navigation/index.js";
import { Brand } from "./modules/Brand/index.js";
// import { Search } from "~/modules/Search"; Removed in 5.37.0, it will be refactored later
import { UserMenu } from "~/modules/UserMenu/index.js";
import { Overlays } from "./modules/Overlays/index.js";
import { NotFound } from "./modules/NotFound/index.js";
import { Dashboard } from "./modules/Dashboard/index.js";

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
            <Brand />
            <Navigation />
            {/*<Search />*/}
            <UserMenu />
            <Overlays />
        </Fragment>
    );
};
