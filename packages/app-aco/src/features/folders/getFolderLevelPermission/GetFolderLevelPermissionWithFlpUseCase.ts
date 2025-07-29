import type {
    GetFolderLevelPermissionParams,
    IGetFolderLevelPermissionUseCase
} from "./IGetFolderLevelPermissionUseCase";
import type { IGetFolderLevelPermissionRepository } from "./IGetFolderLevelPermissionRepository";

export class GetFolderLevelPermissionWithFlpUseCase implements IGetFolderLevelPermissionUseCase {
    private repository: IGetFolderLevelPermissionRepository;

    constructor(repository: IGetFolderLevelPermissionRepository) {
        this.repository = repository;
    }

    execute(params: GetFolderLevelPermissionParams) {
        return this.repository.execute(params.id);
    }
}
