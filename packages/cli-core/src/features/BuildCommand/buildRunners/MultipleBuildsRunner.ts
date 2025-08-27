import { BaseBuildRunner } from "./BaseBuildRunner.js";
import Listr from "listr";
import { measureDuration } from "~/features/utils/index.js";

export class MultipleBuildsRunner extends BaseBuildRunner {
    public override async run() {
        const getBuildDuration = measureDuration();
        const ui = this.ui;

        const builder = this.packagesBuilder;
        const buildProcesses = builder.prepare();

        ui.info(`Building %s packages... `, buildProcesses.length);

        const onBeforeBuildCallbacks = builder.getOnBeforeBuildCallbacks();
        for (const onBeforeBuildCallback of onBeforeBuildCallbacks) {
            await onBeforeBuildCallback(builder.getBuildParams());
        }

        const tasksList = buildProcesses.map(buildProcess => {
            return {
                title: buildProcess.pkg.name,
                task: () => {
                    return buildProcess.run().catch(error => {
                        new Error("Build failed.", {
                            cause: { pkg: buildProcess, error }
                        });
                    });
                }
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
            .then(async () => {
                const onAfterBuildCallbacks = builder.getOnAfterBuildCallbacks();
                for (const onAfterBuildCallback of onAfterBuildCallbacks) {
                    await onAfterBuildCallback(builder.getBuildParams());
                }

                ui.success(`Built ${buildProcesses.length} packages in ${getBuildDuration()}.`);
            });
    }
}
