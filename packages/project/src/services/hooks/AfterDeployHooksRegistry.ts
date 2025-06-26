import { createImplementation } from "@webiny/di-container";
import { AfterDeployHooksRegistry, AfterDeployHook } from "~/abstractions";

export class DefaultAfterDeployHooksRegistry implements AfterDeployHooksRegistry.Interface {
    constructor(private afterDeployHooks: AfterDeployHook.Interface[]) {}

    execute() {
        return this.afterDeployHooks;
    }
}

export const afterDeployHooksRegistry = createImplementation({
    abstraction: AfterDeployHooksRegistry,
    implementation: DefaultAfterDeployHooksRegistry,
    dependencies: [[AfterDeployHook, { multiple: true }]]
});
