import { createImplementation } from "@webiny/di-container";
import { AfterBuildHooksRegistry, AfterBuildHook } from "~/abstractions";

export class DefaultAfterBuildHooksRegistry implements AfterBuildHooksRegistry.Interface {
    constructor(private afterBuildHooks: AfterBuildHook.Interface[]) {}

    execute() {
        return this.afterBuildHooks;
    }
}

export const afterBuildHooksRegistry = createImplementation({
    abstraction: AfterBuildHooksRegistry,
    implementation: DefaultAfterBuildHooksRegistry,
    dependencies: [[AfterBuildHook, { multiple: true }]]
});
