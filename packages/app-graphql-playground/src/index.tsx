import React, { memo } from "react";
import type { ApolloClient } from "apollo-client";
import { plugins } from "@webiny/plugins";
import { AdminConfig, Layout } from "@webiny/app-admin";
import { ReactComponent as ApiPlaygroundIcon } from "@webiny/icons/swap_horiz.svg";
import { useRouter } from "@webiny/app/router.js";
import Playground from "./plugins/Playground.js";
import playgroundPlugins from "./plugins/index.js";
import { Routes } from "~/routes.js";

const { Route, Menu } = AdminConfig;

interface CreateApolloClientParams {
    uri: string;
}

interface GraphQLPlaygroundProps {
    createApolloClient(params: CreateApolloClientParams): ApolloClient<any>;
}

const GraphQLPlaygroundExtension = ({ createApolloClient }: GraphQLPlaygroundProps) => {
    const router = useRouter();
    plugins.register(playgroundPlugins);

    return (
        <AdminConfig>
            <Menu.Support
                pin={"start"}
                name={"api-playground"}
                element={
                    <Menu.Support.Link
                        text={"API Playground"}
                        icon={
                            <Menu.Support.Link.Icon
                                label="API Playground"
                                element={<ApiPlaygroundIcon />}
                            />
                        }
                        to={router.getLink(Routes.ApiPlayground)}
                    />
                }
            />

            <Route
                route={Routes.ApiPlayground}
                element={
                    <Layout title={"API Playground"}>
                        <Playground createApolloClient={createApolloClient} />
                    </Layout>
                }
            />
        </AdminConfig>
    );
};

export const GraphQLPlayground = memo(GraphQLPlaygroundExtension);
