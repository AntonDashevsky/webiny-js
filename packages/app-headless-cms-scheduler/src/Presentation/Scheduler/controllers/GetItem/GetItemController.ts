import type { IGetItemController } from "./IGetItemController.js";
import type { IGetItemUseCase } from "~/UseCases/index.js";
import type { ISchedulerGetExecuteParams } from "~/Gateways/index.js";

export class GetItemController implements IGetItemController {
    private readonly useCaseFactory: () => IGetItemUseCase;

    constructor(useCaseFactory: () => IGetItemUseCase) {
        this.useCaseFactory = useCaseFactory;
    }

    async execute(params: Omit<ISchedulerGetExecuteParams, "modelId">) {
        const getItemUseCase = this.useCaseFactory();
        await getItemUseCase.execute(params);
    }
}
