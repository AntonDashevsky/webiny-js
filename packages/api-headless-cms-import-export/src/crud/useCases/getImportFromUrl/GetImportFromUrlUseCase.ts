import type { IGetImportFromUrlUseCase } from "~/crud/useCases/getImportFromUrl/abstractions/GetImportFromUrlUseCase.js";
import type {
    IImportFromUrlUseCaseExecuteParams,
    IImportFromUrlUseCaseExecuteResponse
} from "../importFromUrl/abstractions/ImportFromUrlUseCase.js";
import type { ITasksContextObject } from "@webiny/tasks";
import { IMPORT_FROM_URL_CONTROLLER_TASK } from "~/tasks/constants.js";
import { convertTaskToImportRecord } from "~/crud/utils/convertTaskToImportRecord.js";
import type {
    IImportFromUrlControllerInput,
    IImportFromUrlControllerOutput
} from "~/tasks/domain/abstractions/ImportFromUrlController.js";

export interface IGetImportFromUrlUseCaseParams {
    getTask: ITasksContextObject["getTask"];
}

export class GetImportFromUrlUseCase implements IGetImportFromUrlUseCase {
    private readonly getTask: ITasksContextObject["getTask"];

    public constructor(params: IGetImportFromUrlUseCaseParams) {
        this.getTask = params.getTask;
    }

    public async execute(
        params: IImportFromUrlUseCaseExecuteParams
    ): Promise<IImportFromUrlUseCaseExecuteResponse | null> {
        const task = await this.getTask<
            IImportFromUrlControllerInput,
            IImportFromUrlControllerOutput
        >(params.id);

        if (task?.definitionId !== IMPORT_FROM_URL_CONTROLLER_TASK) {
            return null;
        }
        return convertTaskToImportRecord(task);
    }
}
