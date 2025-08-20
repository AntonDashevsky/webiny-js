import { fork } from "child_process";
import path from "path";
import { BasePackagesBuilder } from "./BasePackagesBuilder.js";

export class MultiplePackagesBuilder extends BasePackagesBuilder {
    public override build() {
        const workerPath = path.resolve(import.meta.dirname, "worker.js");
        const packages = this.packages;
        const params = this.params;
        this.logger.debug(`Building %s packages...`, packages.length);
        this.logger.debug("The following packages will be built for changes:", packages);

        return packages.map(pkg => {
            const buildConfig = JSON.stringify({ ...params, package: { paths: pkg.paths } });

            const childProcess = fork(workerPath, [buildConfig], {
                env: { ...process.env },
                stdio: ["pipe", "pipe", "pipe", "ipc"]
            });

            return {
                packageName: pkg.name,
                process: childProcess
            };
        });
    }
}
