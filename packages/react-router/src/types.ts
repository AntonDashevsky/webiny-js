import { type Plugin } from "@webiny/plugins/types.js";
import { type ApolloClient } from "apollo-client";

export interface ReactRouterOnLinkPlugin extends Plugin {
    type: "react-router-on-link";
    onLink(params: { link: string; apolloClient: ApolloClient<any> }): void;
}
