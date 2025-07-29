import type { Callable } from "./PulumiCommandLifecycleEventHookPlugin";
import { PulumiCommandLifecycleEventHookPlugin } from "./PulumiCommandLifecycleEventHookPlugin";

export class AfterBuildPlugin extends PulumiCommandLifecycleEventHookPlugin {
    public static override type: string = "hook-after-build";
}

export const createAfterBuildPlugin = (callable: Callable) => {
    return new AfterBuildPlugin(callable);
};
