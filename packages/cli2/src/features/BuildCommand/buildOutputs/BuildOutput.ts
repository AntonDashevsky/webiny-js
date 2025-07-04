import { ZeroBuildsOutput } from "./ZeroBuildsOutput.js";
import { SingleBuildOutput } from "./SingleBuildOutput.js";
import { MultipleBuildsOutput } from "./MultipleBuildsOutput.js";
import { BaseBuildOutput } from "./BaseBuildOutput.js";

export class BuildOutput extends BaseBuildOutput {
    public override output() {
        const OutputClass = this.getOutputClass();

        const output = new OutputClass({
            buildProcesses: this.buildProcesses,
            stdio: this.stdio,
            ui: this.ui
        });

        return output.output();
    }

    private getOutputClass() {
        const buildsCount = this.buildProcesses.length;
        if (buildsCount === 0) {
            return ZeroBuildsOutput;
        }

        if (buildsCount === 1) {
            return SingleBuildOutput;
        }

        return MultipleBuildsOutput;
    }
}
