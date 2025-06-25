interface AbsRelPaths {
    relative: string;
    absolute: string;
}

export interface IAppModel {
    name: string;
    paths: {
        appsFolder: AbsRelPaths;
        workspaceFolder: AbsRelPaths;
    };

    getConfig(): Promise<Record<string, any>>;

    getPlugins(): Promise<Record<string, any>>;
}
