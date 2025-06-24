import { Abstraction } from "@webiny/di-container";

interface IGetIsCiService {
    execute(): boolean;
}

export const GetIsCiService = new Abstraction<IGetIsCiService>("GetIsCiService");

export namespace GetIsCiService {
    export type Interface = IGetIsCiService;
}
