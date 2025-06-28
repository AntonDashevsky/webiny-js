import { createImplementation } from "@webiny/di-container";
import {
    AfterDeployHooksRegistry,
    BeforeDeployHooksRegistry,
    BuildAppService,
    DeployAppService, GetProjectService,
    GetPulumiService,
    PulumiSelectStackService
} from "~/abstractions";
import { AppModel } from "~/models";
import { executeDeploy } from "./utils/executeDeploy";
import { executePreview } from "./utils/executePreview";

export class DefaultDeployAppService implements DeployAppService.Interface {
    constructor(
        private buildAppService: BuildAppService.Interface,
        private beforeDeployHooksRegistry: BeforeDeployHooksRegistry.Interface,
        private afterDeployHooksRegistry: AfterDeployHooksRegistry.Interface,
        private getProjectService: GetProjectService.Interface,
        private getPulumiService: GetPulumiService.Interface,
        private pulumiSelectStackService: PulumiSelectStackService.Interface
    ) {}

    async execute(app: AppModel, params: DeployAppService.Params): Promise<void> {
        if (!params.env) {
            throw new Error(`Please specify environment, for example "dev".`);
        }

        await this.buildAppService.execute(app, params);

        const beforeDeployHooks = this.beforeDeployHooksRegistry.execute();
        for (const beforeDeployHook of beforeDeployHooks) {
            await beforeDeployHook.execute();
        }

        await this.pulumiSelectStackService.execute(app, params);

        // A Pulumi refresh might be executed before the deploy. For example,
        // this is needed if the user run the watch command prior to the deploy.
        // await executeRefresh(commandParams);

        const pulumi = await this.getPulumiService.execute({ app });
        const project = this.getProjectService.execute();

        if (params.preview) {
            await executePreview(pulumi, project, params);
        } else {
            await executeDeploy(pulumi, project, params);
        }

        const afterDeployHooks = this.afterDeployHooksRegistry.execute();
        for (const afterDeployHook of afterDeployHooks) {
            await afterDeployHook.execute();
        }
    }
}

export const deployAppService = createImplementation({
    abstraction: DeployAppService,
    implementation: DefaultDeployAppService,
    dependencies: [
        BuildAppService,
        BeforeDeployHooksRegistry,
        AfterDeployHooksRegistry,
        GetProjectService,
        GetPulumiService,
        PulumiSelectStackService
    ]
});
