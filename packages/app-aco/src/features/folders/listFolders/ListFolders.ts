import { LoadingRepository, loadingRepositoryFactory } from "@webiny/app-utils";
import { IListFoldersUseCase } from "./IListFoldersUseCase.js";
import { IListFoldersGateway } from "./IListFoldersGateway.js";
import { ListFoldersRepository } from "./ListFoldersRepository.js";
import { ListFoldersUseCaseWithLoading } from "./ListFoldersUseCaseWithLoading.js";
import { ListFoldersUseCase } from "./ListFoldersUseCase.js";
import { folderCacheFactory, ListCache } from "../cache/index.js";
import { Folder } from "../Folder.js";

interface IListFoldersInstance {
    useCase: IListFoldersUseCase;
    folders: ListCache<Folder>;
    loading: LoadingRepository;
}

export class ListFolders {
    public static getInstance(type: string, gateway: IListFoldersGateway): IListFoldersInstance {
        const foldersCache = folderCacheFactory.getCache(type);
        const loadingRepository = loadingRepositoryFactory.getRepository(type);
        const repository = new ListFoldersRepository(foldersCache, gateway, type);
        const useCase = new ListFoldersUseCase(repository);
        const useCaseWithLoading = new ListFoldersUseCaseWithLoading(loadingRepository, useCase);

        return {
            useCase: useCaseWithLoading,
            folders: foldersCache,
            loading: loadingRepository
        };
    }
}
