import { createImplementation } from "@webiny/di-container";
import { BeforeBuildHooksRegistry, BeforeBuildHook } from "~/abstractions";

export class DefaultBeforeBuildHooksRegistry implements BeforeBuildHooksRegistry.Interface {
    constructor(private beforeBuildHooks: BeforeBuildHook.Interface[]) {}

    execute() {
        console.log('>>> this.beforeBuildHooks',  this.beforeBuildHooks)
        return this.beforeBuildHooks;
    }
}

export const beforeBuildHooksRegistry = createImplementation({
    abstraction: BeforeBuildHooksRegistry,
    implementation: DefaultBeforeBuildHooksRegistry,
    dependencies: [[BeforeBuildHook, { multiple: true }]]
});
