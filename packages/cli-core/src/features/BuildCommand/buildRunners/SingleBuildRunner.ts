import { BaseBuildRunner } from "./BaseBuildRunner.js";
import { measureDuration } from "~/features/utils/index.js";

export class SingleBuildRunner extends BaseBuildRunner {
    public override async run() {
        const ui = this.ui;

        const buildProcesses = this.packagesBuilder.prepare();
        const [buildProcess] = buildProcesses.getProcesses();

        ui.info(`Building %s package... `, buildProcess.pkg.name);

        buildProcess.setForkOptions({
            stdio: "inherit",
            env: process.env
        });

        const getBuildDuration = measureDuration();

        try {
            await buildProcesses.run();
            ui.success(`Built %s package in %s.`, buildProcess.pkg.name, getBuildDuration());
        } catch {
            ui.error("Build failed, please check the details above.");
        }
    }
}
