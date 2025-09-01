import { IPathModel } from "./IPathModel";

export interface IProjectModel {
    name: string;
    paths: {
        webinyConfigFile: IPathModel;
        rootFolder: IPathModel;
        dotWebinyFolder: IPathModel;
        workspacesFolder: IPathModel;
        localPulumiStateFilesFolder: IPathModel;
    };
}
