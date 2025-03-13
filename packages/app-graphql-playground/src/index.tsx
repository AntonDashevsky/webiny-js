import React, { memo } from "react";
import { ApolloClient } from "apollo-client";
import { plugins } from "@webiny/plugins";
import { Layout, Plugins } from "@webiny/app-admin";
import Playground from "./plugins/Playground";
import playgroundPlugins from "./plugins";
import { RouterConfig } from "@webiny/app/config/RouterConfig";

const { Route } = RouterConfig;

interface CreateApolloClientParams {
    uri: string;
}

interface GraphQLPlaygroundProps {
    createApolloClient(params: CreateApolloClientParams): ApolloClient<any>;
}

const GraphQLPlaygroundExtension = ({ createApolloClient }: GraphQLPlaygroundProps) => {
    plugins.register(playgroundPlugins);

    return (
        <Plugins>
            <RouterConfig>
                <Route
                    name={'apiPlayground'}
                    path={"/api-playground"}
                    element={
                        <Layout title={"API Playground"}>
                            <Playground createApolloClient={createApolloClient} />
                        </Layout>
                    }
                />
            </RouterConfig>
        </Plugins>
    );
};

export const GraphQLPlayground = memo(GraphQLPlaygroundExtension);
