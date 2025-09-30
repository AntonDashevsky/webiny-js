import React from "react";
import { Dashboard, AdminLayout, NotFound } from "~/index.js";
import { AdminConfig } from "~/config/AdminConfig.js";
import { Routes } from "~/routes.js";

const { Route } = AdminConfig;

export const RoutesConfig = React.memo(() => {
    return (
        <AdminConfig>
            <Route
                route={Routes.Dashboard}
                element={
                    <AdminLayout title={"Welcome!"}>
                        <Dashboard />
                    </AdminLayout>
                }
            />

            <Route
                route={Routes.CatchAll}
                element={
                    <AdminLayout title={"Not Accessible"}>
                        <NotFound />
                    </AdminLayout>
                }
            />
        </AdminConfig>
    );
});

RoutesConfig.displayName = "Routes";
