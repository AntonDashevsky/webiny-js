import type {
    IImportFromUrlUseCaseExecuteParams,
    IImportFromUrlUseCaseExecuteResponse
} from "~/crud/useCases/importFromUrl/abstractions/ImportFromUrlUseCase.js";

export interface IGetImportFromUrlUseCase {
    execute(
        params: IImportFromUrlUseCaseExecuteParams
    ): Promise<IImportFromUrlUseCaseExecuteResponse | null>;
}
