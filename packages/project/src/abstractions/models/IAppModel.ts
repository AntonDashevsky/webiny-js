import { GetApp } from "~/abstractions/index.js";

interface AbsRelPaths {
    relative: string;
    absolute: string;
}

export interface IAppModel {
    name: GetApp.AppName;
    paths: {
        workspaceFolder: AbsRelPaths;
        localPulumiStateFilesFolder: AbsRelPaths;
    };

    getConfig(): Promise<Record<string, any>>;

    getPlugins(): Promise<Record<string, any>>;
}
