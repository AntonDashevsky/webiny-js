import { Abstraction } from "@webiny/di-container";
import { IBaseAppParams } from "~/abstractions/types.js";
import { GetApp } from "~/abstractions/index.js";

export interface IListPackagesServiceParams extends Omit<IBaseAppParams, "app" | "env"> {
    app?: GetApp.AppName;
    env?: string;
    whitelist?: string[];
}

export interface IListPackagesPackage {
    name: string;
    paths: {
        packageFolder: string;
        webinyConfigFile: string;
    };
}

export type IListPackagesServiceResult = IListPackagesPackage[];

export interface IListPackagesService {
    execute(params: IListPackagesServiceParams): Promise<IListPackagesServiceResult>;
}

export const ListPackagesService = new Abstraction<IListPackagesService>("ListPackagesService");

export namespace ListPackagesService {
    export type Interface = IListPackagesService;
    export type Params = IListPackagesServiceParams;
    export type Package = IListPackagesPackage;
    export type Result = IListPackagesServiceResult;
}
