import { BasePackagesWatcher } from "./BasePackagesWatcher.js";
import { NoDeploymentsPackagesWatcher } from "./NoDeploymentsPackagesWatcher/NoDeploymentsPackagesWatcher.js";

export class PackagesWatcher extends BasePackagesWatcher {
    public override async watch(): Promise<void> {
        const WatcherClass = this.getWatcherClass();

        const watcher = new WatcherClass({
            packages: this.packages,
            inputs: this.inputs,
            context: this.context
        });

        await watcher.watch();
    }

    public getWatcherClass() {
        return NoDeploymentsPackagesWatcher;
    }
}
