import { Abstraction } from "@webiny/di-container";

type IGetProjectVersionServiceResult = string;

interface IGetProjectVersionService {
    execute(cwd?: string): IGetProjectVersionServiceResult;
}

export const GetProjectVersionService = new Abstraction<IGetProjectVersionService>(
    "GetProjectVersionService"
);

export namespace GetProjectVersionService {
    export type Interface = IGetProjectVersionService;
    export type Result = IGetProjectVersionServiceResult;
}
