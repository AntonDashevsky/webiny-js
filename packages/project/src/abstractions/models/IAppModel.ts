import { GetApp } from "~/abstractions/index.js";
import { IPathModel } from "./IPathModel.js";

export interface IAppModelDto {
    name: GetApp.AppName;
    paths: {
        workspaceFolder: string;
        localPulumiStateFilesFolder: string;
    };
}

export interface IAppModel {
    name: GetApp.AppName;
    paths: {
        workspaceFolder: IPathModel;
        localPulumiStateFilesFolder: IPathModel;
    };

    getConfig(): Promise<Record<string, any>>;

    getPlugins(): Promise<Record<string, any>>;
}
