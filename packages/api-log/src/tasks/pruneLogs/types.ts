import { type Context as TaskContext, type ITaskResponseDoneResultOutput } from "@webiny/tasks";
import { type Context as LoggerContext, type LogType } from "~/types.js";

export interface IPruneLogsInput {
    tenant?: string;
    source?: string;
    type?: LogType;
    createdAfter?: string;
    keys?: string;
    items?: number;
}

export interface IPruneLogsOutput extends ITaskResponseDoneResultOutput {
    items: number;
    message?: string;
    key?: string;
}

export interface Context extends LoggerContext, TaskContext {}
