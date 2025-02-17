import { TrashBinItem, TrashBinItemDTO } from "~/Domain/index.js";
import { ISelectItemsUseCase } from "~/UseCases/index.js";
import { ISelectItemsController } from "./ISelectItemsController.js";

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
