import { createDecorator } from "@webiny/di-container";
import { DeployApp } from "~/abstractions/index.js";
import {
    AdminBeforeDeploy,
    AdminAfterDeploy,
    ApiBeforeDeploy,
    ApiAfterDeploy,
    CoreBeforeDeploy,
    CoreAfterDeploy
} from "~/abstractions/index.js";

export class DeployAppWithHooks implements DeployApp.Interface {
    constructor(
        private adminBeforeDeploy: AdminBeforeDeploy.Interface,
        private adminAfterDeploy: AdminAfterDeploy.Interface,
        private apiBeforeDeploy: ApiBeforeDeploy.Interface,
        private apiAfterDeploy: ApiAfterDeploy.Interface,
        private coreBeforeDeploy: CoreBeforeDeploy.Interface,
        private coreAfterDeploy: CoreAfterDeploy.Interface,
        private decoratee: DeployApp.Interface
    ) {}

    async execute(params: DeployApp.Params) {
        if (params.app === "core") {
            await this.coreBeforeDeploy.execute(params);
            const result = await this.decoratee.execute(params);
            await this.coreAfterDeploy.execute(params);
            return result;
        }

        if (params.app === "api") {
            await this.apiBeforeDeploy.execute(params);
            const result = await this.decoratee.execute(params);
            await this.apiAfterDeploy.execute(params);
            return result;
        }

        if (params.app === "admin") {
            await this.adminBeforeDeploy.execute(params);
            const result = await this.decoratee.execute(params);
            await this.adminAfterDeploy.execute(params);
            return result;
        }

        return this.decoratee.execute(params);
    }
}

export const deployAppWithHooks = createDecorator({
    abstraction: DeployApp,
    decorator: DeployAppWithHooks,
    dependencies: [
        AdminBeforeDeploy,
        AdminAfterDeploy,
        ApiBeforeDeploy,
        ApiAfterDeploy,
        CoreBeforeDeploy,
        CoreAfterDeploy
    ]
});
