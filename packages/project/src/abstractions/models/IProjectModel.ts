import { type IPathModel, type IPathModelDto } from "./IPathModel.js";

export interface IProjectModelDto {
    name: string;
    version: string;
    paths: {
        webinyConfigFile: IPathModelDto;
        rootFolder: IPathModelDto;
        dotWebinyFolder: IPathModelDto;
        workspacesFolder: IPathModelDto;
        localPulumiStateFilesFolder: IPathModelDto;
    };
}

export interface IProjectModel {
    name: string;
    version: string;
    paths: {
        webinyConfigFile: IPathModel;
        rootFolder: IPathModel;
        dotWebinyFolder: IPathModel;
        workspacesFolder: IPathModel;
        localPulumiStateFilesFolder: IPathModel;
    };

    toDto(): IProjectModelDto;
}
