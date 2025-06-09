import { type IListFoldersUseCase } from "./IListFoldersUseCase.js";
import { type IListFoldersRepository } from "./IListFoldersRepository.js";

export class ListFoldersUseCase implements IListFoldersUseCase {
    private repository: IListFoldersRepository;

    constructor(repository: IListFoldersRepository) {
        this.repository = repository;
    }

    async execute() {
        await this.repository.execute();
    }
}
