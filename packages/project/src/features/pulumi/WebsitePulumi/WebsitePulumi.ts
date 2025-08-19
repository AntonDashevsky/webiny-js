import { createComposite } from "@webiny/di-container";
import { WebsitePulumi } from "~/abstractions/index.js";

export class CompositeWebsitePulumi implements WebsitePulumi.Interface {
    constructor(private websitePulumi: WebsitePulumi.Interface[]) {}

    async execute(params: WebsitePulumi.Params) {
        for (const handler of this.websitePulumi) {
            await handler.execute(params);
        }
    }
}

export const websitePulumi = createComposite({
    abstraction: WebsitePulumi,
    implementation: CompositeWebsitePulumi,
    dependencies: [[WebsitePulumi, { multiple: true }]]
});
