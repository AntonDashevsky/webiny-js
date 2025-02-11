import {
    Callable,
    PulumiCommandLifecycleEventHookPlugin
} from "./PulumiCommandLifecycleEventHookPlugin.js";

export class BeforeBuildPlugin extends PulumiCommandLifecycleEventHookPlugin {
    public static override type = "hook-before-build";
}

export const createBeforeBuildPlugin = (callable: Callable) => {
    return new BeforeBuildPlugin(callable);
};
