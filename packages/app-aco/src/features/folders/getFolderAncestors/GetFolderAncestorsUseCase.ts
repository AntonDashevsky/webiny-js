import type {
    GetFolderAncestorsParams,
    IGetFolderAncestorsUseCase
} from "./IGetFolderAncestorsUseCase.js";
import type { IGetFolderAncestorsRepository } from "./IGetFolderAncestorsRepository.js";

export class GetFolderAncestorsUseCase implements IGetFolderAncestorsUseCase {
    private repository: IGetFolderAncestorsRepository;

    constructor(repository: IGetFolderAncestorsRepository) {
        this.repository = repository;
    }

    execute(params: GetFolderAncestorsParams) {
        const folders = this.repository.execute(params.id);

        return folders.map(folder => ({
            id: folder.id,
            title: folder.title,
            slug: folder.slug,
            permissions: folder.permissions,
            type: folder.type,
            parentId: folder.parentId
        }));
    }
}
