import { BasePackagesWatcher } from "./BasePackagesWatcher.js";
import { fork } from "child_process";
import path from "path";

export class SinglePackageWatcher extends BasePackagesWatcher {
    public override watch() {
        const workerPath = path.resolve(import.meta.dirname, "worker.js");
        const pkg = this.packages[0];
        const params = this.params;

        const buildConfig = JSON.stringify({
            ...params,
            package: { paths: pkg.paths }
        });

        const childProcess = fork(workerPath, [buildConfig], {
            env: { ...process.env },
            stdio: ["pipe", "pipe", "pipe", "ipc"]
        });

        return [
            {
                packageName: pkg.name,
                process: childProcess
            }
        ];
    }
}
