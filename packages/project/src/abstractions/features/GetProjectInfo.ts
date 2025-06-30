import { Abstraction } from "@webiny/di-container";
import { ProjectInfoService } from "~/abstractions/services/ProjectInfoService";

type GetProjectInfoParams = void;
type GetProjectInfoResult = ProjectInfoService.Result;

interface IGetProjectInfo {
    execute(params: GetProjectInfoParams): Promise<GetProjectInfoResult>;
}

export const GetProjectInfo = new Abstraction<IGetProjectInfo>("GetProjectInfo");

export namespace GetProjectInfo {
    export type Interface = IGetProjectInfo;

    export type Params = GetProjectInfoParams;

    export type Result = GetProjectInfoResult;
}
