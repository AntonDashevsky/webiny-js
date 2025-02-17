import type { Context } from "~/types.js";
import type {
    IImportFromUrlControllerInput,
    IImportFromUrlControllerOutput
} from "~/tasks/domain/abstractions/ImportFromUrlController.js";
import type { ITaskResponseResult, ITaskRunParams } from "@webiny/tasks";

export interface ImportFromUrlControllerStep<
    C extends Context = Context,
    I extends IImportFromUrlControllerInput = IImportFromUrlControllerInput,
    O extends IImportFromUrlControllerOutput = IImportFromUrlControllerOutput
> {
    execute(params: ITaskRunParams<C, I, O>): Promise<ITaskResponseResult<I, O>>;
}
