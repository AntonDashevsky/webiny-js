import { Abstraction } from "@webiny/di-container";
import { ChildProcess } from "child_process";

export interface IWatchProcess {
    packageName: string;
    process: ChildProcess;
}

export interface IWatchNoAppParams {
    package?: string | string[];
}

export interface IWatchWithAppParams extends IWatchNoAppParams {
    app: string;
    env: string;
    variant?: string;
    region?: string;
    allowProduction?: boolean;

    // Local AWS Lambda development (https://webiny.link/local-aws-lambda-development)
    inspect?: boolean;
    increaseTimeout?: number;
}

export type IWatchParams = IWatchNoAppParams | IWatchWithAppParams;
export type IWatchResult = Promise<IWatchProcess[]>;



export interface IWatch {
    execute(params: IWatchParams): IWatchResult
}

export const Watch = new Abstraction<IWatch>("Watch");

export namespace Watch {
    export type Interface = IWatch;

    export type Params = IWatchParams;
    export type Result = IWatchResult;
}
