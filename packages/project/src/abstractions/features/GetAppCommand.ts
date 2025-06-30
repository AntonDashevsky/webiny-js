import { Abstraction } from "@webiny/di-container";
import { IAppModel, IProjectModel } from "~/abstractions/models";
import { I } from "./I";

type IGetAppParams = {
    project: IProjectModel,
    appName: string;
}

type IGetApp = I<IGetAppParams, IAppModel>;

export const GetApp = new Abstraction<IGetApp>("GetApp");

export namespace GetApp {
    export type Interface = IGetApp;
    export type Params = IGetAppParams;
}
