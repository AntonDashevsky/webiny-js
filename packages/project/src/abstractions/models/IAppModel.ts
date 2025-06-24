import { IProjectModel } from "./IProjectModel";

interface AbsRelPaths {
    relative: string;
    absolute: string;
}

export interface IAppModel {
    project: IProjectModel;
    name: string;
    paths: {
        appsFolder: AbsRelPaths;
        workspaceFolder: AbsRelPaths;
    };

    getConfig(): Promise<Record<string, any>>;

    getPlugins(): Promise<Record<string, any>>;

    getPackages(): Promise<Record<string, string>>;
}
