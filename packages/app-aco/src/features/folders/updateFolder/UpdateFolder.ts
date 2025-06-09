import { loadingRepositoryFactory } from "@webiny/app-utils";
import { type IUpdateFolderUseCase } from "./IUpdateFolderUseCase.js";
import { type IUpdateFolderGateway } from "./IUpdateFolderGateway.js";
import { UpdateFolderRepository } from "./UpdateFolderRepository.js";
import { UpdateFolderRepositoryWithPermissionsChange } from "./UpdateFolderRepositoryWithPermissionsChange.js";
import { UpdateFolderUseCase } from "./UpdateFolderUseCase.js";
import { UpdateFolderUseCaseWithLoading } from "./UpdateFolderUseCaseWithLoading.js";
import { UpdateFolderUseCaseWithoutInheritedPermissions } from "./UpdateFolderUseCaseWithoutInheritedPermissions.js";
import { folderCacheFactory } from "../cache/index.js";
import { UpdateFolderRepositoryWithPathChange } from "~/features/folders/updateFolder/UpdateFolderRepositoryWithPathChange.js";

export class UpdateFolder {
    public static getInstance(type: string, gateway: IUpdateFolderGateway): IUpdateFolderUseCase {
        const foldersCache = folderCacheFactory.getCache(type);
        const loadingRepository = loadingRepositoryFactory.getRepository(type);

        const repository = new UpdateFolderRepository(foldersCache, gateway);
        const repositoryWithPathChange = new UpdateFolderRepositoryWithPathChange(
            foldersCache,
            repository
        );
        const repositoryWithPermissionsChange = new UpdateFolderRepositoryWithPermissionsChange(
            foldersCache,
            repositoryWithPathChange
        );

        const useCase = new UpdateFolderUseCase(repositoryWithPermissionsChange);
        const useCaseWithoutInheritedPermissions =
            new UpdateFolderUseCaseWithoutInheritedPermissions(useCase);
        return new UpdateFolderUseCaseWithLoading(
            loadingRepository,
            useCaseWithoutInheritedPermissions
        );
    }
}
