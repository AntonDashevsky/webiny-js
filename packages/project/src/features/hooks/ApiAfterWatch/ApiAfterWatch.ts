import { createComposite } from "@webiny/di-container";
import { ApiAfterWatch } from "~/abstractions/index.js";

export class CompositeApiAfterWatch implements ApiAfterWatch.Interface {
    constructor(private apiAfterWatch: ApiAfterWatch.Interface[]) {}

    async execute(params: ApiAfterWatch.Params) {
        for (const afterWatch of this.apiAfterWatch) {
            await afterWatch.execute(params);
        }
    }
}

export const apiAfterWatch = createComposite({
    abstraction: ApiAfterWatch,
    implementation: CompositeApiAfterWatch,
    dependencies: [[ApiAfterWatch, { multiple: true }]]
});
