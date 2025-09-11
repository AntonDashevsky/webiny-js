import React from "react";
import { Dashboard, Layout, NotFound } from "~/index.js";
import { AdminConfig } from "~/config/AdminConfig.js";

const { Route } = AdminConfig;

export const Routes = React.memo(() => {
    return (
        <AdminConfig>
            <Route
                name={"home"}
                path={"/"}
                element={
                    <Layout title={"Welcome!"}>
                        <Dashboard />
                    </Layout>
                }
            />

            <Route
                name={"default"}
                path={"*"}
                element={
                    <Layout title={"Not Accessible"}>
                        <NotFound />
                    </Layout>
                }
            />
        </AdminConfig>
    );
});

Routes.displayName = "Routes";
