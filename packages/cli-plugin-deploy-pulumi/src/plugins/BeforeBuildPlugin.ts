import type { Callable } from "./PulumiCommandLifecycleEventHookPlugin";
import { PulumiCommandLifecycleEventHookPlugin } from "./PulumiCommandLifecycleEventHookPlugin";

export class BeforeBuildPlugin extends PulumiCommandLifecycleEventHookPlugin {
    public static override type = "hook-before-build";
}

export const createBeforeBuildPlugin = (callable: Callable) => {
    return new BeforeBuildPlugin(callable);
};
