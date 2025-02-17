import graphqlPlugins from "./graphql/index.js";
import { ContextPlugin } from "@webiny/api";
import { TenantManagerContext } from "./types.js";

export default () => [
    graphqlPlugins(),
    new ContextPlugin<TenantManagerContext>(context => {
        context.tenantManager = true;
    })
];
