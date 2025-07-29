import graphqlPlugins from "./graphql";
import { ContextPlugin } from "@webiny/api";
import type { TenantManagerContext } from "./types";

export default () => [
    graphqlPlugins(),
    new ContextPlugin<TenantManagerContext>(context => {
        context.tenantManager = true;
    })
];
