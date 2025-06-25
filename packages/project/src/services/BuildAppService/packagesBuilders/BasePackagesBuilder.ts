import { BuildAppService, LoggerService } from "~/abstractions";
import { IAppPackageModel } from "~/abstractions/models";

export class BasePackagesBuilder {
    constructor(
        public packages: IAppPackageModel[],
        public buildParams: BuildAppService.Params,
        public logger: LoggerService.Interface
    ) {}

    public async build() {
        throw new Error("Not implemented.");
    }
}
