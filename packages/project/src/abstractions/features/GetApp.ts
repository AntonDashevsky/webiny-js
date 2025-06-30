import { Abstraction } from "@webiny/di-container";
import { IAppModel } from "~/abstractions/models";

type IGetApp = {
    execute(appName: string): Promise<IAppModel>;
};

export const GetApp = new Abstraction<IGetApp>("GetApp");

export namespace GetApp {
    export type Interface = IGetApp;
    export type Params = string;
}
