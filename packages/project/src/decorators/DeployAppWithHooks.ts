import { createDecorator } from "@webiny/di-container";
import { DeployApp } from "~/abstractions";
import {
    AdminBeforeDeploy,
    AdminAfterDeploy,
    ApiBeforeDeploy,
    ApiAfterDeploy,
    CoreBeforeDeploy,
    CoreAfterDeploy,
    WebsiteBeforeDeploy,
    WebsiteAfterDeploy
} from "~/abstractions";

export class DeployAppWithHooks implements DeployApp.Interface {
    constructor(
        private adminBeforeDeploy: AdminBeforeDeploy.Interface,
        private adminAfterDeploy: AdminAfterDeploy.Interface,
        private apiBeforeDeploy: ApiBeforeDeploy.Interface,
        private apiAfterDeploy: ApiAfterDeploy.Interface,
        private coreBeforeDeploy: CoreBeforeDeploy.Interface,
        private coreAfterDeploy: CoreAfterDeploy.Interface,
        private websiteBeforeDeploy: WebsiteBeforeDeploy.Interface,
        private websiteAfterDeploy: WebsiteAfterDeploy.Interface,
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

        if (params.app === "website") {
            await this.websiteBeforeDeploy.execute(params);
            const result = await this.decoratee.execute(params);
            await this.websiteAfterDeploy.execute(params);
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
        CoreAfterDeploy,
        WebsiteBeforeDeploy,
        WebsiteAfterDeploy
    ]
});
