import { createImplementation } from "@webiny/di-container";
import { CorePulumiHandler, UiService } from "@webiny/extensions/project";

class MyCorePulumiHandler implements CorePulumiHandler.Interface {
    constructor(private ui: UiService.Interface) {}

    execute({ env }: CorePulumiHandler.Params) {
        // Only in production environments, increase the
        // memory size of the GraphQL function.
        if (env.isProduction) {
            resources.graphql.functions.graphql.config.memorySize(1024);
        }
    }
}

export default createImplementation({
    abstraction: CorePulumiHandler,
    implementation: MyCorePulumiHandler,
    dependencies: []
});
