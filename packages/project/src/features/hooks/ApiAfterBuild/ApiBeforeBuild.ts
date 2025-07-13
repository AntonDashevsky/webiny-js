import { createComposite } from "@webiny/di-container";
import { ApiAfterBuild } from "~/abstractions/index.js";

export class CompositeApiAfterBuild implements ApiAfterBuild.Interface {
    constructor(private apiAfterBuild: ApiAfterBuild.Interface[]) {}

    async execute(params: ApiAfterBuild.Params) {
        for (const beforeBuild of this.apiAfterBuild) {
            await beforeBuild.execute(params);
        }
    }
}

export const apiAfterBuild = createComposite({
    abstraction: ApiAfterBuild,
    implementation: CompositeApiAfterBuild,
    dependencies: [[ApiAfterBuild, { multiple: true }]]
});
