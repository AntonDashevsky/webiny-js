import { createComposite } from "@webiny/di-container";
import { CoreAfterWatch } from "~/abstractions/index.js";

export class CompositeCoreAfterWatch implements CoreAfterWatch.Interface {
    constructor(private coreAfterWatch: CoreAfterWatch.Interface[]) {}

    async execute(params: CoreAfterWatch.Params) {
        for (const afterWatch of this.coreAfterWatch) {
            await afterWatch.execute(params);
        }
    }
}

export const coreAfterWatch = createComposite({
    abstraction: CoreAfterWatch,
    implementation: CompositeCoreAfterWatch,
    dependencies: [[CoreAfterWatch, { multiple: true }]]
});
