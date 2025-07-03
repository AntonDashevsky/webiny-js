import { LoggerService, Watch } from "~/abstractions";
import { ChildProcess } from "child_process";

export interface IBasePackagesWatcherPackage {
    name: string;
    webinyConfig: Record<string, any>;
    paths: {
        packageFolder: string;
        webinyConfigFile: string;
    };
}

export interface IBasePackagesWatcherParams {
    packages: IBasePackagesWatcherPackage[];
    logger: LoggerService.Interface
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

    public watch(): ChildProcess[] {
        throw new Error("Not implemented.");
    }
}
