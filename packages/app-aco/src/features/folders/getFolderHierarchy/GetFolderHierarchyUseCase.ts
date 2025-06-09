import {
    type GetFolderHierarchyUseCaseParams,
    type IGetFolderHierarchyUseCase
} from "./IGetFolderHierarchyUseCase.js";
import { type IGetFolderHierarchyRepository } from "./IGetFolderHierarchyRepository.js";

export class GetFolderHierarchyUseCase implements IGetFolderHierarchyUseCase {
    private repository: IGetFolderHierarchyRepository;

    constructor(repository: IGetFolderHierarchyRepository) {
        this.repository = repository;
    }

    async execute({ id }: GetFolderHierarchyUseCaseParams) {
        await this.repository.execute({
            id
        });
    }
}
