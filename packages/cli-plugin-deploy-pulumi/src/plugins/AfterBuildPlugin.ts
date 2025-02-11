import {
    Callable,
    PulumiCommandLifecycleEventHookPlugin
} from "./PulumiCommandLifecycleEventHookPlugin.js";

export class AfterBuildPlugin extends PulumiCommandLifecycleEventHookPlugin {
    public static override type: string = "hook-after-build";
}

export const createAfterBuildPlugin = (callable: Callable) => {
    return new AfterBuildPlugin(callable);
};
