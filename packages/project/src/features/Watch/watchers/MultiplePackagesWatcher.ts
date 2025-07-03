import { ChildProcess, fork } from "child_process";
import path from "path";
import { BasePackagesWatcher } from "./BasePackagesWatcher.js";
import { getRandomColorForString } from "~/utils/index.js";
import { Transform } from "stream";
import chalk from "chalk";

const WORKER_PATH = path.resolve(import.meta.dirname, "worker.js");

function createPrefixer(prefix: string) {
    // This returns a Transform stream that prefixes each line
    return new Transform({
        readableObjectMode: true,
        writableObjectMode: true,
        transform(chunk, encoding, callback) {
            const str = chunk.toString();
            const lines = str.split(/\r?\n/);
            for (let i = 0; i < lines.length; i++) {
                if (lines[i].trim() !== "") {
                    this.push(`${prefix}: ${lines[i]}\n`);
                }
            }
            callback();
        }
    });
}

export class MultiplePackagesWatcher extends BasePackagesWatcher {
    public override watch() {
        const packages = this.packages;
        const params = this.params;
        this.logger.debug(`Watching %s packages...`, packages.length);
        this.logger.debug("The following packages will be watched for changes:", packages);

        const workerProcesses: ChildProcess[] = [];

        for (let i = 0; i < packages.length; i++) {
            const pkg = packages[i];

            const buildConfig = JSON.stringify({
                ...params,
                package: { paths: pkg.paths }
            });

            const childProcess = fork(WORKER_PATH, [buildConfig], {
                env: { ...process.env },
                stdio: ["pipe", "pipe", "pipe", "ipc"]
            });

            // Create prefixing transforms
            const pkgPrefix = chalk.hex(getRandomColorForString(pkg.name))(pkg.name);

            if (childProcess.stdout) {
                const prefixedStdout = createPrefixer(pkgPrefix);
                childProcess.stdout.pipe(prefixedStdout).pipe(process.stdout);
            }

            if (childProcess.stderr) {
                const prefixedStderr = createPrefixer(pkgPrefix);
                childProcess.stderr.pipe(prefixedStderr).pipe(process.stdout);
            }

            workerProcesses.push(childProcess);
        }

        return workerProcesses;
    }
}
