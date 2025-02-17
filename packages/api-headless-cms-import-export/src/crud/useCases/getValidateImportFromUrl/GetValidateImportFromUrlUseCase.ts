import type { ITasksContextObject } from "@webiny/tasks";
import { VALIDATE_IMPORT_FROM_URL_INTEGRITY_TASK } from "~/tasks/constants.js";
import type {
    IGetValidateImportFromUrlExecuteParams,
    IGetValidateImportFromUrlExecuteResponse,
    IGetValidateImportFromUrlUseCase
} from "./abstractions/GetValidateImportFromUrlUseCase.js";
import type {
    IValidateImportFromUrlInput,
    IValidateImportFromUrlOutput
} from "~/tasks/domain/abstractions/ValidateImportFromUrl.js";
import { convertTaskToValidateImportFromUrlRecord } from "~/crud/utils/convertTaskToValidateImportFromUrlRecord.js";

export interface IGetValidateImportFromUrlUseCaseParams {
    getTask: ITasksContextObject["getTask"];
}

export class GetValidateImportFromUrlUseCase implements IGetValidateImportFromUrlUseCase {
    private readonly getTask: ITasksContextObject["getTask"];

    public constructor(params: IGetValidateImportFromUrlUseCaseParams) {
        this.getTask = params.getTask;
    }

    public async execute(
        params: IGetValidateImportFromUrlExecuteParams
    ): Promise<IGetValidateImportFromUrlExecuteResponse | null> {
        const task = await this.getTask<IValidateImportFromUrlInput, IValidateImportFromUrlOutput>(
            params.id
        );

        if (task?.definitionId !== VALIDATE_IMPORT_FROM_URL_INTEGRITY_TASK) {
            return null;
        }

        return convertTaskToValidateImportFromUrlRecord(task);
    }
}
