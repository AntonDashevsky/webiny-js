import { BaseBuildOutput } from "./BaseBuildOutput.js";
import { measureDuration } from "~/features/utils/index.js";

export class SingleBuildOutput extends BaseBuildOutput {
    public override async output() {
        const ui = this.ui;

        const [buildProcess] = this.buildProcesses;
        buildProcess.process.stdout!.pipe(this.stdio.getStdout());
        buildProcess.process.stderr!.pipe(this.stdio.getStderr());
        ui.info(`Building %s package... `, buildProcess.packageName);

        const getBuildDuration = measureDuration();

        return new Promise<void>((resolve, reject) => {
            buildProcess.process.on("error", error => {
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

                ui.success(
                    `Built %s package in %s.`,
                    buildProcess.packageName,
                    getBuildDuration()
                );
                resolve();
            });
        });
    }
}
