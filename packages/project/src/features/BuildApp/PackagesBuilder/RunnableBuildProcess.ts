import { fork, type ForkOptions } from "child_process";
import path from "path";
import {
    IPackagesBuilder,
    IRunnableBuildProcess,
    IBasePackagesBuilderPackage
} from "~/abstractions/models/index.js";

export interface RunnableProcessParams {
    builder: IPackagesBuilder;
    pkg: IBasePackagesBuilderPackage;
    forkOptions?: ForkOptions;
}

export class RunnableBuildProcess implements IRunnableBuildProcess {
    builder: IPackagesBuilder;
    pkg: IBasePackagesBuilderPackage;
    forkOptions: ForkOptions | undefined;

    constructor(params: RunnableProcessParams) {
        this.builder = params.builder;
        this.pkg = params.pkg;
        this.forkOptions = params.forkOptions || {
            env: { ...process.env },
            stdio: ["pipe", "pipe", "pipe", "ipc"]
        };
    }

    run() {
        const workerPath = path.resolve(import.meta.dirname, "worker.js");

        const buildParams = this.builder.getBuildParams();
        const buildProcess = fork(
            workerPath,
            [JSON.stringify({ ...buildParams, package: this.pkg })],
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

    getPackage() {
        return this.pkg;
    }
}
