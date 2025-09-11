import { loadingRepositoryFactory } from "@webiny/app-utils";
import type { IGetFolderUseCase } from "./IGetFolderUseCase";
import type { IGetFolderGateway } from "./IGetFolderGateway";
import { GetFolderRepository } from "./GetFolderRepository";
import { GetFolderUseCase } from "./GetFolderUseCase";
import { GetFolderUseCaseWithLoading } from "./GetFolderUseCaseWithLoading";
import { folderCacheFactory } from "../cache";

export class GetFolder {
    public static getInstance(type: string, gateway: IGetFolderGateway): IGetFolderUseCase {
        const foldersCache = folderCacheFactory.getCache(type);
        const loadingRepository = loadingRepositoryFactory.getRepository(type);
        const repository = new GetFolderRepository(foldersCache, gateway);
        const useCase = new GetFolderUseCase(repository);
        return new GetFolderUseCaseWithLoading(loadingRepository, useCase);
    }
}
