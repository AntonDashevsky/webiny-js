import type { TrashBinItemDTO } from "~/Domain/index.js";
import { TrashBinItem } from "~/Domain/index.js";
import type { ISelectItemsUseCase } from "~/UseCases/index.js";
import type { ISelectItemsController } from "./ISelectItemsController.js";

export class SelectItemsController implements ISelectItemsController {
    private readonly useCaseFactory: () => ISelectItemsUseCase;

    constructor(useCaseFactory: () => ISelectItemsUseCase) {
        this.useCaseFactory = useCaseFactory;
    }

    async execute(items: TrashBinItemDTO[]) {
        const selectItemsUseCase = this.useCaseFactory();
        const itemsDTOs = items.map(item => TrashBinItem.create(item));
        await selectItemsUseCase.execute(itemsDTOs);
    }
}
