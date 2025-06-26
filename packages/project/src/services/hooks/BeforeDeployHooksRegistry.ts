import { createImplementation } from "@webiny/di-container";
import { BeforeDeployHooksRegistry, BeforeDeployHook } from "~/abstractions";

export class DefaultBeforeDeployHooksRegistry implements BeforeDeployHooksRegistry.Interface {
    constructor(private beforeDeployHooks: BeforeDeployHook.Interface[]) {}

    execute() {
        return this.beforeDeployHooks;
    }
}

export const beforeDeployHooksRegistry = createImplementation({
    abstraction: BeforeDeployHooksRegistry,
    implementation: DefaultBeforeDeployHooksRegistry,
    dependencies: [[BeforeDeployHook, { multiple: true }]]
});
