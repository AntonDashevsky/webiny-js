import { BasePackagesWatcher } from "../BasePackagesWatcher.js";
import { NoDeploymentsZeroPackagesWatcher } from "./NoDeploymentsZeroPackagesWatcher.js";
import { NoDeploymentsSinglePackageWatcher } from "./NoDeploymentsSinglePackageWatcher.js";
import { NoDeploymentsMultiplePackagesWatcher } from "./NoDeploymentsMultiplePackagesWatcher.js";

export class NoDeploymentsPackagesWatcher extends BasePackagesWatcher {
    public override async watch(): Promise<void> {
        const WatcherClass = this.getWatcherClass();

        const watcher = new WatcherClass({
            packages: this.packages,
            inputs: this.inputs,
            context: this.context
        });

        await watcher.watch();
    }

    private getWatcherClass() {
        const packagesCount = this.packages.length;
        if (packagesCount === 0) {
            return NoDeploymentsZeroPackagesWatcher;
        }

        if (packagesCount === 1) {
            return NoDeploymentsSinglePackageWatcher;
        }

        return NoDeploymentsMultiplePackagesWatcher;
    }
}
