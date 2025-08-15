import { createAbstraction, type Result } from "@webiny/feature";
import type { WcpProject } from "~/types";

export interface IGetProjectUseCase {
    execute(): Promise<Result<WcpProject | null>>;
}

export const GetProjectUseCase = createAbstraction<IGetProjectUseCase>("GetProjectUseCase");

export namespace GetProjectUseCase {
    export type Interface = IGetProjectUseCase;
    export type Result = ReturnType<IGetProjectUseCase["execute"]>;
}
