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
            buildProcess.process.on("exit", code => {
                if (code !== 0) {
                    ui.error("Build failed, please check the details above.");
                    resolve();
                } else {
                    ui.success(
                        `Built %s package in %s.`,
                        buildProcess.packageName,
                        getBuildDuration()
                    );
                    resolve();
                }
            });
        });
    }
}
