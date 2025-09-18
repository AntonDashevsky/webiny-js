import { createDecorator } from "@webiny/di-container";
import { BuildApp } from "~/abstractions/index.js";
import {
    AdminAfterBuild,
    AdminBeforeBuild,
    AfterBuild,
    ApiAfterBuild,
    ApiBeforeBuild,
    BeforeBuild,
    CoreAfterBuild,
    CoreBeforeBuild
} from "~/abstractions/index.js";

export class BuildAppWithHooks implements BuildApp.Interface {
    constructor(
        private beforeBuild: BeforeBuild.Interface,
        private afterBuild: AfterBuild.Interface,
        private adminBeforeBuild: AdminBeforeBuild.Interface,
        private adminAfterBuild: AdminAfterBuild.Interface,
        private apiBeforeBuild: ApiBeforeBuild.Interface,
        private apiAfterBuild: ApiAfterBuild.Interface,
        private coreBeforeBuild: CoreBeforeBuild.Interface,
        private coreAfterBuild: CoreAfterBuild.Interface,
        private decoratee: BuildApp.Interface
    ) {}

    async execute(params: BuildApp.Params) {
        if (params.app === "core") {
            await this.beforeBuild.execute(params);
            await this.coreBeforeBuild.execute(params);
            const packagesBuilder = await this.decoratee.execute(params);
            packagesBuilder.onAfterBuild(async () => {
                await this.coreAfterBuild.execute(params);
                await this.afterBuild.execute(params);
            });

            return packagesBuilder;
        }

        if (params.app === "api") {
            await this.beforeBuild.execute(params);
            await this.apiBeforeBuild.execute(params);
            const packagesBuilder = await this.decoratee.execute(params);
            packagesBuilder.onAfterBuild(async () => {
                await this.apiAfterBuild.execute(params);
                await this.afterBuild.execute(params);
            });

            return packagesBuilder;
        }

        if (params.app === "admin") {
            await this.beforeBuild.execute(params);
            await this.adminBeforeBuild.execute(params);
            const packagesBuilder = await this.decoratee.execute(params);
            packagesBuilder.onAfterBuild(async () => {
                await this.adminAfterBuild.execute(params);
                await this.afterBuild.execute(params);
            });

            return packagesBuilder;
        }

        return this.decoratee.execute(params);
    }
}

export const buildAppWithHooks = createDecorator({
    abstraction: BuildApp,
    decorator: BuildAppWithHooks,
    dependencies: [
        BeforeBuild,
        AfterBuild,
        AdminBeforeBuild,
        AdminAfterBuild,
        ApiBeforeBuild,
        ApiAfterBuild,
        CoreBeforeBuild,
        CoreAfterBuild
    ]
});
