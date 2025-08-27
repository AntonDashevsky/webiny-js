import { ForkOptions } from "child_process";
import { IRunnableBuildProcess } from "./IRunnableBuildProcess.js";
import { IPackagesBuilder } from "./IPackagesBuilder.js";

export interface IRunnableBuildProcesses {
    run(): Promise<void>;

    setForkOptions(options: ForkOptions): this;

    getBuilder(): IPackagesBuilder;

    getProcesses(): IRunnableBuildProcess[];

    map<TReturn>(cb: (process: IRunnableBuildProcess) => TReturn): TReturn[];

    forEach(cb: (process: IRunnableBuildProcess) => void): void;

    get length(): number;
}
