import type { IImportFromUrlUseCaseExecuteResponse } from "~/crud/useCases/index.js";

export interface IAbortImportFromUrlUseCaseExecuteParams {
    id: string;
}

export interface IAbortImportFromUrlUseCase {
    execute: (
        params: IAbortImportFromUrlUseCaseExecuteParams
    ) => Promise<IImportFromUrlUseCaseExecuteResponse>;
}
