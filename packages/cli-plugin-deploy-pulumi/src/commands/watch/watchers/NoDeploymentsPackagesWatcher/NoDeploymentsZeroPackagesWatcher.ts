import { BasePackagesWatcher } from "../BasePackagesWatcher.js";

export class NoDeploymentsZeroPackagesWatcher extends BasePackagesWatcher {
    public override async watch(): Promise<void> {
        // Simply don't do anything. There are no packages to watch.
        return;
    }
}
