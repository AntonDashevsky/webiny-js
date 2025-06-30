import { Abstraction } from "@webiny/di-container";
import { I } from "./I";
import { ProjectInfoService } from "~/abstractions/services/ProjectInfoService";

type GetProjectInfoParams = void;
type GetProjectInfoResult = ProjectInfoService.Result;

type IGetProjectInfo = I<GetProjectInfoParams, GetProjectInfoResult>;

export const GetProjectInfo = new Abstraction<IGetProjectInfo>("GetProjectInfo");

export namespace GetProjectInfo {
    export type Interface = IGetProjectInfo;

    export type Params = GetProjectInfoParams;

    export type Result = GetProjectInfoResult;
}
