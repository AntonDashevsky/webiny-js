import { BuildApp, LoggerService } from "~/abstractions/index.js";
import { RunnableBuildProcessCollection } from "~/features/BuildApp/builders/RunnableBuildProcessCollection.js";

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
    logger: LoggerService.Interface;
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

    public build(): RunnableBuildProcessCollection {
        throw new Error("Not implemented.");
    }
}
