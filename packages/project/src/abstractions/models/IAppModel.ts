interface AbsRelPaths {
    relative: string;
    absolute: string;
}

export interface IAppModel {
    name: string;
    paths: {
        workspaceFolder: AbsRelPaths;
        localPulumiStateFilesFolder: AbsRelPaths;
    };

    getConfig(): Promise<Record<string, any>>;

    getPlugins(): Promise<Record<string, any>>;
}
