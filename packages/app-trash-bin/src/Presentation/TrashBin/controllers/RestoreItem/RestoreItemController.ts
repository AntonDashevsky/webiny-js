import type { IRestoreItemUseCase } from "~/UseCases/index.js";
import type { IRestoreItemController } from "./IRestoreItemController.js";

export class RestoreItemController implements IRestoreItemController {
    private readonly useCaseFactory: () => IRestoreItemUseCase;

    constructor(useCaseFactory: () => IRestoreItemUseCase) {
        this.useCaseFactory = useCaseFactory;
    }

    async execute(id: string) {
        const restoreItemUseCase = this.useCaseFactory();
        await restoreItemUseCase.execute(id);
    }
}
