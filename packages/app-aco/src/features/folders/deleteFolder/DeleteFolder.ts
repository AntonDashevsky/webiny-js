import { loadingRepositoryFactory } from "@webiny/app-utils";
import { type IDeleteFolderUseCase } from "./IDeleteFolderUseCase.js";
import { DeleteFolderRepository } from "./DeleteFolderRepository.js";
import { DeleteFolderUseCase } from "./DeleteFolderUseCase.js";
import { DeleteFolderUseCaseWithLoading } from "./DeleteFolderUseCaseWithLoading.js";
import { type IDeleteFolderGateway } from "./IDeleteFolderGateway.js";
import { folderCacheFactory } from "../cache/index.js";

export class DeleteFolder {
    public static getInstance(type: string, gateway: IDeleteFolderGateway): IDeleteFolderUseCase {
        const foldersCache = folderCacheFactory.getCache(type);
        const loadingRepository = loadingRepositoryFactory.getRepository(type);
        const repository = new DeleteFolderRepository(foldersCache, gateway);
        const useCase = new DeleteFolderUseCase(repository);
        return new DeleteFolderUseCaseWithLoading(loadingRepository, useCase);
    }
}
