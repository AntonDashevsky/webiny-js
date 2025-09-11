import type { IBulkActionUseCase } from "~/UseCases/index.js";
import type { IBulkActionsController } from "./IBulkActionsController.js";
import type { TrashBinBulkActionsParams } from "~/types.js";

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
