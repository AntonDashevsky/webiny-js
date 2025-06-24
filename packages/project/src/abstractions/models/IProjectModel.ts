interface AbsRelPaths {
    relative: string;
    absolute: string;
}

export interface IProjectModel {
    paths: {
        manifestFile: AbsRelPaths;
        rootFolder: AbsRelPaths;
        workspacesFolder: AbsRelPaths;
    };
}
