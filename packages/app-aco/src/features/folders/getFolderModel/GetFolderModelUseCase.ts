import type { IGetFolderModelRepository } from "./IGetFolderModelRepository";
import type { IGetFolderModelUseCase } from "./IGetFolderModelUseCase";

export class GetFolderModelUseCase implements IGetFolderModelUseCase {
    private repository: IGetFolderModelRepository;

    constructor(repository: IGetFolderModelRepository) {
        this.repository = repository;
    }

    async execute() {
        await this.repository.load();
    }
}
