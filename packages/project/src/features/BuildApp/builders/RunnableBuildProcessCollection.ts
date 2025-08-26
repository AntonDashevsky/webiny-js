import { RunnableBuildProcess } from "./RunnableBuildProcess.js";
import { ForkOptions } from "child_process";

export class RunnableBuildProcessCollection {
    runnableBuildProcesses: RunnableBuildProcess[];

    constructor(runnableBuildProcesses: RunnableBuildProcess[]) {
        this.runnableBuildProcesses = runnableBuildProcesses;
    }

    run() {
        return this.runnableBuildProcesses.map(runnableBuildProcess => runnableBuildProcess.run());
    }

    getLength() {
        return this.runnableBuildProcesses.length;
    }

    setForkOptions(options: ForkOptions) {
        this.runnableBuildProcesses.forEach(runnableBuildProcess => {
            runnableBuildProcess.setForkOptions(options);
        });

        return this;
    }

    getProcesses() {
        return this.runnableBuildProcesses;
    }
}
