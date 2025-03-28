import { loadingRepositoryFactory } from "@webiny/app-utils";
import { ICreateFolderUseCase } from "./ICreateFolderUseCase.js";
import { ICreateFolderGateway } from "./ICreateFolderGateway.js";
import { CreateFolderRepository } from "./CreateFolderRepository.js";
import { CreateFolderUseCase } from "./CreateFolderUseCase.js";
import { CreateFolderUseCaseWithLoading } from "./CreateFolderUseCaseWithLoading.js";
import { folderCacheFactory } from "../cache/index.js";

export class CreateFolder {
    public static getInstance(type: string, gateway: ICreateFolderGateway): ICreateFolderUseCase {
        const foldersCache = folderCacheFactory.getCache(type);
        const loadingRepository = loadingRepositoryFactory.getRepository(type);
        const repository = new CreateFolderRepository(foldersCache, gateway, type);
        const useCase = new CreateFolderUseCase(repository);
        return new CreateFolderUseCaseWithLoading(loadingRepository, useCase);
    }
}
