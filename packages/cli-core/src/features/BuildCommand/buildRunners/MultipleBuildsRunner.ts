import { BaseBuildRunner } from "./BaseBuildRunner.js";
import Listr from "listr";
import { measureDuration } from "~/features/utils/index.js";
import chalk from "chalk";

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
            const pkg = buildProcess.getPackage();
            return {
                title: pkg.name,
                task: () => {
                    return buildProcess.run().catch(error => {
                        throw new Error("Build failed.", {
                            cause: { pkg, error }
                        });
                    });
                }
            };
        });

        const tasks = new Listr(tasksList, { concurrent: true, exitOnError: false });

        return tasks
            .run()
            .catch(err => {
                err.errors.forEach((err: Error, i: number) => {
                    const { pkg, error } = err.cause as Record<string, any>;
                    const number = `${i + 1}.`;
                    const name = chalk.red("✖ " + pkg.name);
                    const title = [number, name].join(" ");

                    ui.newLine();
                    ui.text(title);
                    ui.text(error.message);
                });

                throw new Error(`Failed to build some packages. See the logs above for details.`);
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
