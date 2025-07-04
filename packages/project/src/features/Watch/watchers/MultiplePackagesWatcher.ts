import { fork } from "child_process";
import path from "path";
import { BasePackagesWatcher } from "./BasePackagesWatcher.js";

const WORKER_PATH = path.resolve(import.meta.dirname, "worker.js");

export class MultiplePackagesWatcher extends BasePackagesWatcher {
    public override watch() {
        const packages = this.packages;
        const params = this.params;
        this.logger.debug(`Watching %s packages...`, packages.length);
        this.logger.debug("The following packages will be watched for changes:", packages);

        return packages.map(pkg => {
            const buildConfig = JSON.stringify({ ...params, package: { paths: pkg.paths } });

            const childProcess = fork(WORKER_PATH, [buildConfig], {
                env: { ...process.env },
                stdio: ["pipe", "pipe", "pipe", "ipc"]
            });

            return {
                packageName: pkg.name,
                process: childProcess
            }
        });
    }
}
