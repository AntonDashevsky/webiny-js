import { loadingRepositoryFactory } from "@webiny/app-utils";
import { IUpdateFolderUseCase } from "./IUpdateFolderUseCase.js";
import { IUpdateFolderGateway } from "./IUpdateFolderGateway.js";
import { UpdateFolderRepository } from "./UpdateFolderRepository.js";
import { UpdateFolderUseCase } from "./UpdateFolderUseCase.js";
import { UpdateFolderUseCaseWithLoading } from "./UpdateFolderUseCaseWithLoading.js";
import { UpdateFolderUseCaseWithoutInheritedPermissions } from "./UpdateFolderUseCaseWithoutInheritedPermissions.js";
import { folderCacheFactory } from "../cache/index.js";

export class UpdateFolder {
    public static getInstance(type: string, gateway: IUpdateFolderGateway): IUpdateFolderUseCase {
        const foldersCache = folderCacheFactory.getCache(type);
        const loadingRepository = loadingRepositoryFactory.getRepository(type);
        const repository = new UpdateFolderRepository(foldersCache, gateway);
        const useCase = new UpdateFolderUseCase(repository);
        const useCaseWithoutInheritedPermissions =
            new UpdateFolderUseCaseWithoutInheritedPermissions(useCase);
        return new UpdateFolderUseCaseWithLoading(
            loadingRepository,
            useCaseWithoutInheritedPermissions
        );
    }
}
