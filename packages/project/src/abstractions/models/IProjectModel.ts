interface AbsRelPaths {
    relative: string;
    absolute: string;
}

export interface IProjectModel {
    name: string;
    paths: {
        webinyConfigFile: AbsRelPaths;
        rootFolder: AbsRelPaths;
        dotWebinyFolder: AbsRelPaths;
        workspacesFolder: AbsRelPaths;
        localPulumiStateFilesFolder: AbsRelPaths;
    };
}
