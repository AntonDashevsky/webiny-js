import { ZeroPackagesWatcher } from "./ZeroPackagesWatcher.js";
import { SinglePackageWatcher } from "./SinglePackageWatcher.js";
import { MultiplePackagesWatcher } from "./MultiplePackagesWatcher.js";
import { BasePackagesWatcher } from "./BasePackagesWatcher.js";

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

    private getWatcherClass() {
        const packagesCount = this.packages.length;
        if (packagesCount === 0) {
            return ZeroPackagesWatcher;
        }

        if (packagesCount === 1) {
            return SinglePackageWatcher;
        }

        return MultiplePackagesWatcher;
    }
}
