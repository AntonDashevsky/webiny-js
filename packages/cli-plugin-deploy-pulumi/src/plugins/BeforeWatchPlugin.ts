import {
    Callable,
    PulumiCommandLifecycleEventHookPlugin
} from "./PulumiCommandLifecycleEventHookPlugin.js";

export class BeforeWatchPlugin extends PulumiCommandLifecycleEventHookPlugin {
    public static override type = "hook-before-watch";
}

export const createBeforeWatchPlugin = (callable: Callable) => {
    return new BeforeWatchPlugin(callable);
};
