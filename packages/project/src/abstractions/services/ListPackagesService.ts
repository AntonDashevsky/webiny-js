import { Abstraction } from "@webiny/di-container";
import { IBaseAppParams } from "~/abstractions/types.js";

export interface IListPackagesServiceParams extends Omit<IBaseAppParams, "app" | "env"> {
    app?: string;
    env?: string;
    whitelist?: string | string[];
}

export interface IListPackagesPackage {
    name: string;
    webinyConfig: Record<string, any>;
    paths: {
        packageFolder: string;
        webinyConfigFile: string;
    };
}

export type IListPackagesServiceResult = Promise<IListPackagesPackage[]>;

export interface IListPackagesService {
    execute(params: IListPackagesServiceParams): IListPackagesServiceResult;
}

export const ListPackagesService = new Abstraction<IListPackagesService>("ListPackagesService");

export namespace ListPackagesService {
    export type Interface = IListPackagesService;
    export type Params = IListPackagesServiceParams;
    export type Package = IListPackagesPackage;
    export type Result = IListPackagesServiceResult;
}
