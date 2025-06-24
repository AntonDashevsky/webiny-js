interface AbsRelPaths {
    relative: string;
    absolute: string;
}

export interface IAppModel {
    name: string;
    paths: {
        workspaceFolder: AbsRelPaths;
    };
}
