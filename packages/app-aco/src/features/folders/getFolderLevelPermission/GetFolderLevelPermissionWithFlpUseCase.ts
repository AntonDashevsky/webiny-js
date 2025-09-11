import type {
    GetFolderLevelPermissionParams,
    IGetFolderLevelPermissionUseCase
} from "./IGetFolderLevelPermissionUseCase.js";
import type { IGetFolderLevelPermissionRepository } from "./IGetFolderLevelPermissionRepository.js";

export class GetFolderLevelPermissionWithFlpUseCase implements IGetFolderLevelPermissionUseCase {
    private repository: IGetFolderLevelPermissionRepository;

    constructor(repository: IGetFolderLevelPermissionRepository) {
        this.repository = repository;
    }

    execute(params: GetFolderLevelPermissionParams) {
        return this.repository.execute(params.id);
    }
}
