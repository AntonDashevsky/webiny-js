import type { Callable } from "./PulumiCommandLifecycleEventHookPlugin";
import { PulumiCommandLifecycleEventHookPlugin } from "./PulumiCommandLifecycleEventHookPlugin";

export class BeforeDeployPlugin extends PulumiCommandLifecycleEventHookPlugin {
    public static override type: string = "hook-before-deploy";
}

export const createBeforeDeployPlugin = (callable: Callable) => {
    return new BeforeDeployPlugin(callable);
};
