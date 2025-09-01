import { createDecorator } from "@webiny/di-container";
import { BuildApp } from "~/abstractions/index.js";
import {
    AdminBeforeBuild,
    AdminAfterBuild,
    ApiBeforeBuild,
    ApiAfterBuild,
    CoreBeforeBuild,
    CoreAfterBuild,
    WebsiteBeforeBuild,
    WebsiteAfterBuild
} from "~/abstractions/index.js";

export class BuildAppWithHooks implements BuildApp.Interface {
    constructor(
        private adminBeforeBuild: AdminBeforeBuild.Interface,
        private adminAfterBuild: AdminAfterBuild.Interface,
        private apiBeforeBuild: ApiBeforeBuild.Interface,
        private apiAfterBuild: ApiAfterBuild.Interface,
        private coreBeforeBuild: CoreBeforeBuild.Interface,
        private coreAfterBuild: CoreAfterBuild.Interface,
        private websiteBeforeBuild: WebsiteBeforeBuild.Interface,
        private websiteAfterBuild: WebsiteAfterBuild.Interface,
        private decoratee: BuildApp.Interface
    ) {}

    async execute(params: BuildApp.Params) {
        const packagesBuilder = await this.decoratee.execute(params);

        if (params.app === "core") {
            await this.coreBeforeBuild.execute(params);
            packagesBuilder.onAfterBuild(() => this.coreAfterBuild.execute(params));
            return packagesBuilder;
        } else if (params.app === "api") {
            await this.apiBeforeBuild.execute(params);
            packagesBuilder.onAfterBuild(() => this.apiAfterBuild.execute(params));
        } else if (params.app === "admin") {
            await this.adminBeforeBuild.execute(params);
            packagesBuilder.onAfterBuild(() => this.adminAfterBuild.execute(params));
        } else if (params.app === "website") {
            await this.websiteBeforeBuild.execute(params);
            packagesBuilder.onAfterBuild(() => this.websiteAfterBuild.execute(params));
        }

        return packagesBuilder;
    }
}

export const buildAppWithHooks = createDecorator({
    abstraction: BuildApp,
    decorator: BuildAppWithHooks,
    dependencies: [
        AdminBeforeBuild,
        AdminAfterBuild,
        ApiBeforeBuild,
        ApiAfterBuild,
        CoreBeforeBuild,
        CoreAfterBuild,
        WebsiteBeforeBuild,
        WebsiteAfterBuild
    ]
});
