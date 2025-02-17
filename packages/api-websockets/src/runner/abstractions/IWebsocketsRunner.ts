import { IWebsocketsIncomingEvent } from "~/handler/types.js";
import { GenericRecord } from "@webiny/api/types.js";

export interface IWebsocketsResponseError {
    message: string;
    code: string;
    data?: GenericRecord<string> | null;
    stack?: string;
}
export interface IWebsocketsRunnerResponse {
    statusCode: number;
    message?: string;
    error?: IWebsocketsResponseError;
}

export interface IWebsocketsRunner {
    run(params: IWebsocketsIncomingEvent): Promise<IWebsocketsRunnerResponse>;
}
