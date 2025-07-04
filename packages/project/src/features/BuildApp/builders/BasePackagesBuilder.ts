import { LoggerService, BuildApp } from "~/abstractions";
import { ChildProcess } from "child_process";

export interface IBuildProcess {
    packageName: string;
    process: ChildProcess;
}

export interface IBasePackagesBuilderPackage {
    name: string;
    webinyConfig: Record<string, any>;
    paths: {
        packageFolder: string;
        webinyConfigFile: string;
    };
}

export interface IBasePackagesBuilderParams {
    packages: IBasePackagesBuilderPackage[];
    logger: LoggerService.Interface
    params: BuildApp.Params;
}

export class BasePackagesBuilder {
    public readonly packages: IBasePackagesBuilderPackage[];
    public readonly params: BuildApp.Params;
    public readonly logger: LoggerService.Interface;

    public constructor({ packages, params, logger }: IBasePackagesBuilderParams) {
        this.packages = packages;
        this.params = params;
        this.logger = logger;
    }

    public build(): IBuildProcess[] {
        throw new Error("Not implemented.");
    }
}
