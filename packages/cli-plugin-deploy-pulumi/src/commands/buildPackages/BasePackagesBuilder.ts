import type { Context, IUserCommandInput } from "~/types.js";
import type { IProjectApplicationPackage } from "@webiny/cli/types.js";

export interface IBasePackagesBuilderParams {
    packages: IProjectApplicationPackage[];
    inputs: IUserCommandInput;
    context: Context;
}

export class BasePackagesBuilder {
    public packages: IProjectApplicationPackage[];
    public inputs: IUserCommandInput;
    public context: Context;

    constructor({ packages, inputs, context }: IBasePackagesBuilderParams) {
        this.packages = packages;
        this.inputs = inputs;
        this.context = context;
    }

    public async build() {
        throw new Error("Not implemented.");
    }
}
