import { Abstraction } from "@webiny/di-container";
import { type LoggerService } from "~/abstractions/index.js";

type IGetLoggerResult = LoggerService.Interface;

export interface IGetLogger {
    execute(): IGetLoggerResult;
}

export const GetLogger = new Abstraction<IGetLogger>("GetLogger");

export namespace GetLogger {
    export type Interface = IGetLogger;
}
