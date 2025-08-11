import { createComposite } from "@webiny/di-container";
import { WebsiteAfterDeploy } from "~/abstractions/index.js";

export class CompositeWebsiteAfterDeploy implements WebsiteAfterDeploy.Interface {
    constructor(private websiteAfterDeploy: WebsiteAfterDeploy.Interface[]) {}

    async execute(params: WebsiteAfterDeploy.Params) {
        for (const beforeBuild of this.websiteAfterDeploy) {
            await beforeBuild.execute(params);
        }
    }
}

export const websiteAfterDeploy = createComposite({
    abstraction: WebsiteAfterDeploy,
    implementation: CompositeWebsiteAfterDeploy,
    dependencies: [[WebsiteAfterDeploy, { multiple: true }]]
});
