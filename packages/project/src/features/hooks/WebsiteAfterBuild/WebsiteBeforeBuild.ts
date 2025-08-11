import { createComposite } from "@webiny/di-container";
import { WebsiteAfterBuild } from "~/abstractions/index.js";

export class CompositeWebsiteAfterBuild implements WebsiteAfterBuild.Interface {
    constructor(private websiteAfterBuild: WebsiteAfterBuild.Interface[]) {}

    async execute(params: WebsiteAfterBuild.Params) {
        for (const afterBuild of this.websiteAfterBuild) {
            await afterBuild.execute(params);
        }
    }
}

export const websiteAfterBuild = createComposite({
    abstraction: WebsiteAfterBuild,
    implementation: CompositeWebsiteAfterBuild,
    dependencies: [[WebsiteAfterBuild, { multiple: true }]]
});
