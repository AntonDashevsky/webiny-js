import type { UpdateFolderParams, IUpdateFolderUseCase } from "./IUpdateFolderUseCase.js";
import type { IUpdateFolderRepository } from "./IUpdateFolderRepository.js";
import { Folder } from "../Folder.js";

export class UpdateFolderUseCase implements IUpdateFolderUseCase {
    private repository: IUpdateFolderRepository;

    constructor(repository: IUpdateFolderRepository) {
        this.repository = repository;
    }

    async execute(params: UpdateFolderParams) {
        await this.repository.execute(
            Folder.create({
                id: params.id,
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
