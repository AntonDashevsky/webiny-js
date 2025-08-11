import { BaseBuildOutput } from "./BaseBuildOutput.js";

export class ZeroBuildsOutput extends BaseBuildOutput {
    public override async output() {
        const ui = this.ui;
        ui.info(`No packages to build.`);
    }
}
