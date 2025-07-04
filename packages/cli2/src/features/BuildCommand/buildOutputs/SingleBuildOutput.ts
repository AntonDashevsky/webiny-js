import { BaseBuildOutput } from "./BaseBuildOutput.js";

export class SingleBuildOutput extends BaseBuildOutput {
    public override output() {
        const buildProcess = this.buildProcesses[0];
        buildProcess.process.stdout!.pipe(this.stdio.getStdout());
        buildProcess.process.stderr!.pipe(this.stdio.getStderr());
    }
}
