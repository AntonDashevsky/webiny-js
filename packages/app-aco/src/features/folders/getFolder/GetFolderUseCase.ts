import type { GetFolderParams, IGetFolderUseCase } from "./IGetFolderUseCase.js";
import type { IGetFolderRepository } from "./IGetFolderRepository.js";

export class GetFolderUseCase implements IGetFolderUseCase {
    private repository: IGetFolderRepository;

    constructor(repository: IGetFolderRepository) {
        this.repository = repository;
    }

    async execute(params: GetFolderParams) {
        await this.repository.execute(params.id);
    }
}
