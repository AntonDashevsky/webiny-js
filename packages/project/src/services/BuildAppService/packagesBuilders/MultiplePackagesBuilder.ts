import { fork } from "child_process";
import { deserializeError } from "serialize-error";
import path from "path";
import Listr from "listr";
import chalk from "chalk";
import { BasePackagesBuilder } from "./BasePackagesBuilder.js";
import { measureDuration } from "./utils/measureDuration.js";
import { AppPackageModel } from "~/models";

const WORKER_PATH = path.resolve(import.meta.dirname, "workerEntry.js");

export class MultiplePackagesBuilder extends BasePackagesBuilder {
    public override async build(): Promise<void> {
        const packages = this.packages;
        const buildParams = this.buildParams;
        const logger = this.logger;

        const getBuildDuration = measureDuration();

        logger.info(`Building %s packages...`, packages.length);

        const tasksList = packages.map(pkg => {
            return {
                title: this.getPackageLabel(pkg),
                task: () => {
                    return new Promise<void>((resolve, reject) => {
                        const buildConfig = JSON.stringify({
                            ...buildParams,
                            package: { paths: pkg.paths }
                        });
                        const child = fork(WORKER_PATH, [buildConfig], { silent: true });

                        // We only send one message from the child process, and that is the error, if any.
                        child.on("message", serializedError => {
                            const error = deserializeError(serializedError);
                            reject(new Error("Build failed.", { cause: { pkg, error } }));
                        });

                        // Handle child process error events
                        child.on("error", error => {
                            reject(new Error("Build failed.", { cause: { pkg, error } }));
                        });

                        // Handle child process exit and check for errors
                        child.on("exit", code => {
                            if (code !== 0) {
                                const error = new Error(`Build process exited with code ${code}.`);
                                reject(new Error("Build failed.", { cause: { pkg, error } }));
                                return;
                            }

                            resolve();
                        });
                    });
                }
            };
        });

        const tasks = new Listr(tasksList, { concurrent: true, exitOnError: false });

        await tasks.run().catch(err => {
            console.log();
            logger.error(`Failed to build all packages. For more details, check the logs below.`);
            console.log();

            /**
             * Seems List package has wrong types or this never worked.
             */
            err.errors.forEach((err: Error, i: number) => {
                const { pkg, error } = err.cause as Record<string, any>;
                const number = `${i + 1}.`;
                const name = logger.error(pkg.name);
                const relativePath = chalk.gray(`(${pkg.paths.relative})`);
                const title = [number, name, relativePath].join(" ");

                console.log(title);
                console.log(error.message);

                if (buildParams.debug) {
                    console.log(error.stack);
                }
            });

            throw new Error(`Failed to build all packages.`);
        });

        logger.log();

        // TODO: context.success was used here
        logger.info(`Built ${packages.length} packages in ${getBuildDuration()}.`);
    }

    private getPackageLabel(pkg: AppPackageModel): string {
        const pkgName = pkg.name;
        const pkgRelativePath = chalk.gray(`(${pkg.paths.packageFolder})`);
        return `${pkgName} ${pkgRelativePath}`;
    }
}
