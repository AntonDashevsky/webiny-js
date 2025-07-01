import { BuildApp, LoggerService } from "~/abstractions/index.js";
import { IAppPackageModel } from "~/abstractions/models/index.js";

export class BasePackagesBuilder {
    constructor(
        public packages: IAppPackageModel[],
        public buildParams: BuildApp.Params,
        public logger: LoggerService.Interface
    ) {}

    public async build() {
        throw new Error("Not implemented.");
    }
}
