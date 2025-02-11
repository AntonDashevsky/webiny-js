import {
    Callable,
    PulumiCommandLifecycleEventHookPlugin
} from "./PulumiCommandLifecycleEventHookPlugin.js";

export class AfterDeployPlugin extends PulumiCommandLifecycleEventHookPlugin {
    public static override type = "hook-after-deploy";
}

export const createAfterDeployPlugin = (callable: Callable) => {
    return new AfterDeployPlugin(callable);
};
