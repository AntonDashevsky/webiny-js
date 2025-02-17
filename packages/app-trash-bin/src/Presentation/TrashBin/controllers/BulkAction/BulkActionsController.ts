import { IBulkActionUseCase } from "~/UseCases/index.js";
import { IBulkActionsController } from "./IBulkActionsController.js";
import { TrashBinBulkActionsParams } from "~/types.js";

export class BulkActionsController implements IBulkActionsController {
    private readonly useCaseFactory: () => IBulkActionUseCase;
    private readonly action: string;

    constructor(useCaseFactory: () => IBulkActionUseCase, action: string) {
        this.useCaseFactory = useCaseFactory;
        this.action = action;
    }

    async execute(params: TrashBinBulkActionsParams) {
        const bulkActionUseCase = this.useCaseFactory();
        await bulkActionUseCase.execute(this.action, params);
    }
}
