import { createDecorator } from "@webiny/di-container";
import { DeployApp } from "~/abstractions";
import { ApiBeforeDeploy, ApiAfterDeploy } from "~/abstractions";

export class DeployAppWithHooks implements DeployApp.Interface {
    constructor(
        private apiBeforeDeploy: ApiBeforeDeploy.Interface,
        private apiAfterDeploy: ApiAfterDeploy.Interface,
        private decoratee: DeployApp.Interface
    ) {}

    async execute(params: DeployApp.Params) {
        if (params.app === "core") {
            await this.apiBeforeDeploy.execute(params);
            const result = await this.decoratee.execute(params);
            await this.apiAfterDeploy.execute(params);
            return result;
        }

        if (params.app === "api") {
            await this.apiBeforeDeploy.execute(params);
            const result = await this.decoratee.execute(params);
            await this.apiAfterDeploy.execute(params);
            return result;
        }

        if (params.app === "admin") {
            await this.apiBeforeDeploy.execute(params);
            const result = await this.decoratee.execute(params);
            await this.apiAfterDeploy.execute(params);
            return result;
        }

        if (params.app === "website") {
            await this.apiBeforeDeploy.execute(params);
            const result = await this.decoratee.execute(params);
            await this.apiAfterDeploy.execute(params);
            return result;
        }

        return this.decoratee.execute(params);
    }
}

export const deployAppWithHooks = createDecorator({
    abstraction: DeployApp,
    decorator: DeployAppWithHooks,
    dependencies: [ApiBeforeDeploy, ApiAfterDeploy]
});
