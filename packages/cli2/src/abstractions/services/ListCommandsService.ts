import { Abstraction } from "@webiny/di-container";
import { ProjectSdk } from "@webiny/project";

export interface IListCommandsService {
    execute(): ProjectSdk;
}

export const ListCommandsService = new Abstraction<IListCommandsService>("ListCommandsService");

export namespace ListCommandsService {
    export type Interface = IListCommandsService;
}
