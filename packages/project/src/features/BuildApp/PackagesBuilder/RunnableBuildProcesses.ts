import { RunnableBuildProcess } from "./RunnableBuildProcess.js";
import { ForkOptions } from "child_process";
import { PackagesBuilder } from "./PackagesBuilder.js";
import { IRunnableBuildProcesses } from "~/abstractions/models/index.js";

export class RunnableBuildProcesses implements IRunnableBuildProcesses {
    builder: PackagesBuilder;
    runnableBuildProcesses: RunnableBuildProcess[];

    constructor(builder: PackagesBuilder, runnableBuildProcesses: RunnableBuildProcess[]) {
        this.builder = builder;
        this.runnableBuildProcesses = runnableBuildProcesses;
    }

    async run() {
        const buildParams = this.builder.getBuildParams();

        const onBeforeBuildCallbacks = this.builder.getOnBeforeBuildCallbacks();
        for (const onBeforeBuildCallback of onBeforeBuildCallbacks) {
            await onBeforeBuildCallback(buildParams);
        }

        await Promise.all(
            this.runnableBuildProcesses.map(runnableBuildProcess => runnableBuildProcess.run())
        );

        const onAfterBuildCallbacks = this.builder.getOnAfterBuildCallbacks();
        for (const onAfterBuildCallback of onAfterBuildCallbacks) {
            await onAfterBuildCallback(buildParams);
        }
    }

    setForkOptions(options: ForkOptions) {
        this.runnableBuildProcesses.forEach(runnableBuildProcess => {
            runnableBuildProcess.setForkOptions(options);
        });

        return this;
    }

    getBuilder() {
        return this.builder;
    }

    getProcesses() {
        return this.runnableBuildProcesses;
    }

    map<TReturn>(cb: (process: RunnableBuildProcess) => TReturn) {
        return this.runnableBuildProcesses.map(cb);
    }

    forEach(cb: (process: RunnableBuildProcess) => void) {
        return this.runnableBuildProcesses.forEach(cb);
    }

    get length() {
        return this.runnableBuildProcesses.length;
    }
}
