import { createComposite } from "@webiny/di-container";
import { AdminAfterWatch } from "~/abstractions/index.js";

export class CompositeAdminAfterWatch implements AdminAfterWatch.Interface {
    constructor(private AdminAfterWatch: AdminAfterWatch.Interface[]) {}

    async execute(params: AdminAfterWatch.Params) {
        for (const afterWatch of this.AdminAfterWatch) {
            await afterWatch.execute(params);
        }
    }
}

export const adminAfterWatch = createComposite({
    abstraction: AdminAfterWatch,
    implementation: CompositeAdminAfterWatch,
    dependencies: [[AdminAfterWatch, { multiple: true }]]
});
