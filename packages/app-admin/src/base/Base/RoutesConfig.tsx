import React from "react";
import { Dashboard, Layout, NotFound } from "~/index.js";
import { AdminConfig } from "~/config/AdminConfig.js";
import { Routes } from "~/routes.js";

const { Route } = AdminConfig;

export const RoutesConfig = React.memo(() => {
    return (
        <AdminConfig>
            <Route
                route={Routes.Dashboard}
                element={
                    <Layout title={"Welcome!"}>
                        <Dashboard />
                    </Layout>
                }
            />

            <Route
                route={Routes.CatchAll}
                element={
                    <Layout title={"Not Accessible"}>
                        <NotFound />
                    </Layout>
                }
            />
        </AdminConfig>
    );
});

RoutesConfig.displayName = "Routes";
