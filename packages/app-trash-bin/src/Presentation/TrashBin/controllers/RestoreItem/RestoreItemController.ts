import type { IRestoreItemUseCase } from "~/UseCases";
import type { IRestoreItemController } from "./IRestoreItemController";

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
