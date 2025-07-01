import { BuildApp, LoggerService } from "~/abstractions";
import { IAppPackageModel } from "~/abstractions/models";

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
