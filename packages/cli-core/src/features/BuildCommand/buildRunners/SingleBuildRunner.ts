import { BaseBuildRunner } from "./BaseBuildRunner.js";
import { measureDuration } from "~/features/utils/index.js";

export class SingleBuildRunner extends BaseBuildRunner {
    public override async run() {
        const ui = this.ui;

        const [buildProcess] = this.runnableBuildProcessCollection.getProcesses();
        ui.info(`Building %s package... `, buildProcess.pkg.name);

        this.runnableBuildProcessCollection.setForkOptions({
            stdio: "inherit",
            env: process.env
        });

        const getBuildDuration = measureDuration();

        return Promise.all(this.runnableBuildProcessCollection.run())
            .then(() => {
                ui.success(`Built %s package in %s.`, buildProcess.pkg.name, getBuildDuration());
            })
            .catch(() => {
                ui.error("Build failed, please check the details above.");
            });
    }
}
