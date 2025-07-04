import { BasePackagesBuilder } from "./BasePackagesBuilder.js";
import { fork } from "child_process";
import path from "path";

const WORKER_PATH = path.resolve(import.meta.dirname, "worker.js");

export class SinglePackageBuilder extends BasePackagesBuilder {
    public override build() {
        const pkg = this.packages[0];
        const params = this.params;

        const buildConfig = JSON.stringify({
            ...params,
            package: { paths: pkg.paths }
        });

        const childProcess = fork(WORKER_PATH, [buildConfig], {
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
