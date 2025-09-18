import { createComposite } from "@webiny/di-container";
import { AdminBeforeWatch } from "~/abstractions/index.js";

export class CompositeAdminBeforeWatch implements AdminBeforeWatch.Interface {
    constructor(private AdminBeforeWatch: AdminBeforeWatch.Interface[]) {}

    async execute(params: AdminBeforeWatch.Params) {
        for (const beforeWatch of this.AdminBeforeWatch) {
            await beforeWatch.execute(params);
        }
    }
}

export const adminBeforeWatch = createComposite({
    abstraction: AdminBeforeWatch,
    implementation: CompositeAdminBeforeWatch,
    dependencies: [[AdminBeforeWatch, { multiple: true }]]
});
