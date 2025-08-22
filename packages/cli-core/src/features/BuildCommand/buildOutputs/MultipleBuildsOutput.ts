import { BaseBuildOutput } from "./BaseBuildOutput.js";
import Listr from "listr";
import { measureDuration } from "~/features/utils/index.js";

export class MultipleBuildsOutput extends BaseBuildOutput {
    public override output() {
        const buildProcesses = this.buildProcesses;
        const ui = this.ui;

        const getBuildDuration = measureDuration();

        ui.info(`Building %s packages... `, buildProcesses.length);

        const tasksList = buildProcesses.map(buildProcess => {
            return {
                title: buildProcess.packageName,
                task: () =>
                    new Promise<void>((resolve, reject) => {
                        buildProcess.process.on("message", error => {
                            reject(
                                new Error("Build failed.", {
                                    cause: { pkg: buildProcess, error }
                                })
                            );
                        });

                        // Handle child process exit and check for errors
                        buildProcess.process.on("exit", code => {
                            if (code !== 0) {
                                const error = new Error(`Build process exited with code ${code}.`);
                                reject(
                                    new Error("Build failed.", {
                                        cause: { pkg: buildProcess, error }
                                    })
                                );
                                return;
                            }

                            resolve();
                        });
                    })
            };
        });

        const tasks = new Listr(tasksList, { concurrent: true, exitOnError: false });

        return tasks
            .run()
            .catch(err => {
                ui.newLine();
                ui.error(`Failed to build all packages. For more details, check the logs below.`);
                ui.newLine();

                err.errors.forEach((err: Error, i: number) => {
                    const { pkg, error } = err.cause as Record<string, any>;
                    // console.log('pkg', pkg)
                    // const number = `${i + 1}.`;
                    // const name = chalk.red(pkg.name);
                    // const relativePath = chalk.gray(`(${pkg.paths.relative})`);
                    // const title = [number, name, relativePath].join(" ");

                    // ui.text(title);
                    ui.newLine();
                    ui.text(error.message);
                    ui.newLine();

                    // TODO: check this
                    // if (buildParams.debug) {
                    //     console.log(error.stack);
                    // }
                });

                throw new Error(`Failed to build all packages.`);
            })
            .then(() => {
                ui.success(`Built ${buildProcesses.length} packages in ${getBuildDuration()}.`);
            });
    }
}
