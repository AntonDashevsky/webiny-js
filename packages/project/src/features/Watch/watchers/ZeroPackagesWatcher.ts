import { BasePackagesWatcher } from "./BasePackagesWatcher.js";

export class ZeroPackagesWatcher extends BasePackagesWatcher {
    public override watch() {
        // Simply don't do anything. There are no packages to watch.
        return [];
    }
}
