import { ZeroBuildsRunner } from "./ZeroBuildsRunner.js";
import { SingleBuildRunner } from "./SingleBuildRunner.js";
import { MultipleBuildsRunner } from "./MultipleBuildsRunner.js";
import { BaseBuildRunner } from "./BaseBuildRunner.js";

export class BuildRunner extends BaseBuildRunner {
    public override run() {
        const RunnerClass = this.getRunnerClass();

        const runner = new RunnerClass({
            buildProcesses: this.runnableBuildProcessCollection,
            stdio: this.stdio,
            ui: this.ui
        });

        return runner.run();
    }

    private getRunnerClass() {
        const buildsCount = this.runnableBuildProcessCollection.getLength();
        if (buildsCount === 0) {
            return ZeroBuildsRunner;
        }

        if (buildsCount === 1) {
            return SingleBuildRunner;
        }

        return MultipleBuildsRunner;
    }
}
