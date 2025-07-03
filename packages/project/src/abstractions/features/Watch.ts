import { Abstraction } from "@webiny/di-container";
import { ExecaChildProcess } from "execa";

export type IPulumiProcess = ExecaChildProcess<string>;

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

export interface IWatch {
    execute(params: IWatchParams): Promise<void>;
}

export const Watch = new Abstraction<IWatch>("Watch");

export namespace Watch {
    export type Interface = IWatch;

    export type Params = IWatchParams;

    export type PulumiProcess = IPulumiProcess;
}
