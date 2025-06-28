interface AbsRelPaths {
    relative: string;
    absolute: string;
}

export interface IProjectModel {
    name: string;
    paths: {
        manifestFile: AbsRelPaths;
        rootFolder: AbsRelPaths;
        appsFolder: AbsRelPaths;
        workspacesFolder: AbsRelPaths;
        localPulumiStateFilesFolder: AbsRelPaths;
    };
}
