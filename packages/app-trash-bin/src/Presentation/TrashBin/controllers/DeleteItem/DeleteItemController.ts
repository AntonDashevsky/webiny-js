import { IDeleteItemUseCase } from "~/UseCases/index.js";
import { IDeleteItemController } from "./IDeleteItemController.js";

export class DeleteItemController implements IDeleteItemController {
    private readonly useCaseFactory: () => IDeleteItemUseCase;

    constructor(useCaseFactory: () => IDeleteItemUseCase) {
        this.useCaseFactory = useCaseFactory;
    }

    async execute(id: string) {
        const deleteItemUseCase = this.useCaseFactory();
        await deleteItemUseCase.execute(id);
    }
}
