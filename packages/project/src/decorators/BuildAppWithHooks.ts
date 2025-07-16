import { createDecorator } from "@webiny/di-container";
import { BuildApp } from "~/abstractions";
import { ApiBeforeBuild, ApiAfterBuild } from "~/abstractions";

export class BuildAppWithHooks implements BuildApp.Interface {
    constructor(
        private apiBeforeBuild: ApiBeforeBuild.Interface,
        private apiAfterBuild: ApiAfterBuild.Interface,
        private decoratee: BuildApp.Interface
    ) {}

    async execute(params: BuildApp.Params) {
        if (params.app === "core") {
            // TODO: await this.coreBeforeBuild.execute(params);
            const result = await this.decoratee.execute(params);
            // TODO: await this.coreAfterBuild.execute(params);
            return result;
        }

        if (params.app === "api") {
            await this.apiBeforeBuild.execute(params);
            const result = await this.decoratee.execute(params);
            await this.apiAfterBuild.execute(params);
            return result;
        }

        if (params.app === "admin") {
            // TODO: await this.adminBeforeBuild.execute(params);
            const result = await this.decoratee.execute(params);
            // TODO: await this.adminAfterBuild.execute(params);
            return result;
        }

        if (params.app === "website") {
            // TODO: await this.websiteBeforeBuild.execute(params);
            const result = await this.decoratee.execute(params);
            // TODO: await this.websiteAfterBuild.execute(params);
            return result;
        }

        return this.decoratee.execute(params);
    }
}

export const buildAppWithHooks = createDecorator({
    abstraction: BuildApp,
    decorator: BuildAppWithHooks,
    dependencies: [ApiBeforeBuild, ApiAfterBuild]
});
