import { loadingRepositoryFactory } from "@webiny/app-utils";
import { IGetFolderUseCase } from "./IGetFolderUseCase.js";
import { IGetFolderGateway } from "./IGetFolderGateway.js";
import { GetFolderRepository } from "./GetFolderRepository.js";
import { GetFolderUseCase } from "./GetFolderUseCase.js";
import { GetFolderUseCaseWithLoading } from "./GetFolderUseCaseWithLoading.js";
import { folderCacheFactory } from "../cache/index.js";

export class GetFolder {
    public static getInstance(type: string, gateway: IGetFolderGateway): IGetFolderUseCase {
        const foldersCache = folderCacheFactory.getCache(type);
        const loadingRepository = loadingRepositoryFactory.getRepository(type);
        const repository = new GetFolderRepository(foldersCache, gateway);
        const useCase = new GetFolderUseCase(repository);
        return new GetFolderUseCaseWithLoading(loadingRepository, useCase);
    }
}
