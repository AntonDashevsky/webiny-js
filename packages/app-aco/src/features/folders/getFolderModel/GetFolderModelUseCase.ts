import { IGetFolderModelRepository } from "./IGetFolderModelRepository.js";
import { IGetFolderModelUseCase } from "./IGetFolderModelUseCase.js";

export class GetFolderModelUseCase implements IGetFolderModelUseCase {
    private repository: IGetFolderModelRepository;

    constructor(repository: IGetFolderModelRepository) {
        this.repository = repository;
    }

    async execute() {
        await this.repository.load();
    }
}
