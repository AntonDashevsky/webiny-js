import { createComposite } from "@webiny/di-container";
import { WebsiteBeforeBuild } from "~/abstractions/index.js";

export class CompositeWebsiteBeforeBuild implements WebsiteBeforeBuild.Interface {
    constructor(private websiteBeforeBuild: WebsiteBeforeBuild.Interface[]) {}

    async execute(params: WebsiteBeforeBuild.Params) {
        for (const beforeBuild of this.websiteBeforeBuild) {
            await beforeBuild.execute(params);
        }
    }
}

export const websiteBeforeBuild = createComposite({
    abstraction: WebsiteBeforeBuild,
    implementation: CompositeWebsiteBeforeBuild,
    dependencies: [[WebsiteBeforeBuild, { multiple: true }]]
});
