import { type IListFoldersByParentIdsRepository } from "./IListFoldersByParentIdsRepository.js";
import {
    type IListFoldersByParentIdsUseCase,
    type ListFoldersByParentIdsUseCaseParams
} from "./IListFoldersByParentIdsUseCase.js";
import { ROOT_FOLDER } from "~/constants.js";

export class ListFoldersByParentIdsUseCase implements IListFoldersByParentIdsUseCase {
    private repository: IListFoldersByParentIdsRepository;

    constructor(repository: IListFoldersByParentIdsRepository) {
        this.repository = repository;
    }

    async execute(params: ListFoldersByParentIdsUseCaseParams) {
        await this.repository.execute({
            parentIds: this.getParentIds(params.parentIds)
        });
    }

    private getParentIds(parentIds?: string[]) {
        if (!parentIds) {
            return [ROOT_FOLDER];
        }

        return parentIds;
    }
}
