import type { IProjectApplicationPackage } from "@webiny/cli/types.js";
import { LoggerService } from "~/abstractions";

export interface IBasePackagesBuilderParams {
    packages: IProjectApplicationPackage[];
    env: string;
    debug?: boolean;
    variant?: string;
    region?: string;
    logger: LoggerService.Interface;
}

export class BasePackagesBuilder {
    constructor(protected params: IBasePackagesBuilderParams) {}

    public async build() {
        throw new Error("Not implemented.");
    }
}
