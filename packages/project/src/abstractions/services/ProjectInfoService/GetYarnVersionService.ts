import { Abstraction } from "@webiny/di-container";

interface IGetYarnVersionService {
    execute(): string;
}

export const GetYarnVersionService = new Abstraction<IGetYarnVersionService>(
    "GetYarnVersionService"
);

export namespace GetYarnVersionService {
    export type Interface = IGetYarnVersionService;
}
