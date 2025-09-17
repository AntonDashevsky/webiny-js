import { BaseBuildRunner } from "./BaseBuildRunner.js";
import { measureDuration } from "~/features/utils/index.js";

export class SingleBuildRunner extends BaseBuildRunner {
    public override async run() {
        const ui = this.ui;

        const buildProcesses = this.packagesBuilder.prepare();
        const [buildProcess] = buildProcesses.getProcesses();

        const pkg = buildProcess.getPackage();

        buildProcess.setForkOptions({
            stdio: "inherit",
            env: process.env
        });

        const getBuildDuration = measureDuration();

        try {
            await buildProcesses.run();
            ui.success(`Built %s package in %s.`, pkg.name, getBuildDuration());
        } catch {
            throw new Error("Build failed. See the logs above for details.");
        }
    }
}
