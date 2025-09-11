import type { CreateFolderParams, ICreateFolderUseCase } from "./ICreateFolderUseCase.js";
import type { ICreateFolderRepository } from "./ICreateFolderRepository.js";
import { Folder } from "../Folder.js";

export class CreateFolderUseCase implements ICreateFolderUseCase {
    private repository: ICreateFolderRepository;

    constructor(repository: ICreateFolderRepository) {
        this.repository = repository;
    }

    async execute(params: CreateFolderParams) {
        await this.repository.execute(
            Folder.create({
                title: params.title,
                slug: params.slug,
                type: params.type,
                parentId: params.parentId,
                permissions: params.permissions,
                extensions: params.extensions
            })
        );
    }
}
