import { BasePackagesWatcher } from "./BasePackagesWatcher.js";
import { fork } from "child_process";
import path from "path";

const WORKER_PATH = path.resolve(import.meta.dirname, "worker.js");

export class SinglePackageWatcher extends BasePackagesWatcher {
    public override watch() {
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

        if (childProcess.stdout) {
            childProcess.stdout.pipe(process.stdout);
        }

        if (childProcess.stderr) {
            childProcess.stderr.pipe(process.stderr);
        }

        return [childProcess];
    }
}
