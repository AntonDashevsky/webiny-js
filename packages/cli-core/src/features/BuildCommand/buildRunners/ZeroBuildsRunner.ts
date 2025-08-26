import { BaseBuildRunner } from "./BaseBuildRunner.js";

export class ZeroBuildsRunner extends BaseBuildRunner {
    public override async run() {
        this.ui.info(`No packages to build.`);
    }
}
