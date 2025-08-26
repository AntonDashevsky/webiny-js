import { IBasePackagesBuilderPackage } from "./BasePackagesBuilder.js";
import { fork, type ForkOptions } from "child_process";
import path from "path";
import { BuildApp } from "~/abstractions/index.js";

export interface RunnableProcessParams {
    buildParams: BuildApp.Params;
    pkg: IBasePackagesBuilderPackage;
    forkOptions?: ForkOptions;
}

export class RunnableBuildProcess {
    buildParams: BuildApp.Params;
    pkg: IBasePackagesBuilderPackage;
    forkOptions: ForkOptions | undefined;

    constructor(params: RunnableProcessParams) {
        this.buildParams = params.buildParams;
        this.pkg = params.pkg;
        this.forkOptions = params.forkOptions || {
            env: { ...process.env },
            stdio: ["pipe", "pipe", "pipe", "ipc"]
        };
    }

    run() {
        const workerPath = path.resolve(import.meta.dirname, "worker.js");

        const buildProcess = fork(
            workerPath,
            [JSON.stringify({ ...this.buildParams, package: this.pkg })],
            this.forkOptions
        );

        return new Promise<void>((resolve, reject) => {
            buildProcess.on("exit", code => {
                if (code === 0) {
                    resolve();
                } else {
                    reject(
                        new Error(
                            `Build failed for package ${this.pkg.name} with exit code ${code}`
                        )
                    );
                }
            });
        });
    }

    setForkOptions(options: ForkOptions) {
        this.forkOptions = options;
    }
}
