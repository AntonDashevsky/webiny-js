import { createComposite } from "@webiny/di-container";
import { WebsiteBeforeDeploy } from "~/abstractions/index.js";

export class CompositeWebsiteBeforeDeploy implements WebsiteBeforeDeploy.Interface {
    constructor(private websiteBeforeDeploy: WebsiteBeforeDeploy.Interface[]) {}

    async execute(params: WebsiteBeforeDeploy.Params) {
        for (const beforeDeploy of this.websiteBeforeDeploy) {
            await beforeDeploy.execute(params);
        }
    }
}

export const websiteBeforeDeploy = createComposite({
    abstraction: WebsiteBeforeDeploy,
    implementation: CompositeWebsiteBeforeDeploy,
    dependencies: [[WebsiteBeforeDeploy, { multiple: true }]]
});
