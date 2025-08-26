import { ListPackagesService, LoggerService, Watch } from "~/abstractions/index.js";
import { ChildProcess } from "child_process";

export interface IWatchProcess {
    packageName: string;
    process: ChildProcess;
}

export type IBasePackagesWatcherPackage = ListPackagesService.Package;

export interface IBasePackagesWatcherParams {
    packages: IBasePackagesWatcherPackage[];
    logger: LoggerService.Interface;
    params: Watch.Params;
}

export class BasePackagesWatcher {
    public readonly packages: IBasePackagesWatcherPackage[];
    public readonly params: Watch.Params;
    public readonly logger: LoggerService.Interface;

    public constructor({ packages, params, logger }: IBasePackagesWatcherParams) {
        this.packages = packages;
        this.params = params;
        this.logger = logger;
    }

    public watch(): IWatchProcess[] {
        throw new Error("Not implemented.");
    }
}
