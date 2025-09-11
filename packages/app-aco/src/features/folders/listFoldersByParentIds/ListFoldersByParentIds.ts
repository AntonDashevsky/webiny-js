import type { LoadingRepository } from "@webiny/app-utils";
import { loadingRepositoryFactory } from "@webiny/app-utils";
import type { IListFoldersByParentIdsGateway } from "./IListFoldersByParentIdsGateway.js";
import type { IListFoldersByParentIdsUseCase } from "./IListFoldersByParentIdsUseCase.js";
import { ListFoldersByParentIdsRepository } from "./ListFoldersByParentIdsRepository.js";
import { ListFoldersByParentIdsRepositoryWithLoadedCache } from "./ListFoldersByParentIdsRepositoryWithLoadedCache.js";
import { ListFoldersByParentIdsUseCase } from "./ListFoldersByParentIdsUseCase.js";
import type { ListCache } from "../cache/index.js";
import { folderCacheFactory, loadedFolderCacheFactory } from "../cache/index.js";
import type { Folder } from "../Folder.js";
import { ListFoldersByParentIdsUseCaseWithLoading } from "~/features/folders/listFoldersByParentIds/ListFoldersByParentIdsUseCaseWithLoading.js";

interface IListFoldersByParentIdsInstance {
    useCase: IListFoldersByParentIdsUseCase;
    folders: ListCache<Folder>;
    loading: LoadingRepository;
}

export class ListFoldersByParentIds {
    public static getInstance(
        type: string,
        gateway: IListFoldersByParentIdsGateway
    ): IListFoldersByParentIdsInstance {
        const foldersCache = folderCacheFactory.getCache(type);
        const loadedCache = loadedFolderCacheFactory.getCache(type);
        const loadingRepository = loadingRepositoryFactory.getRepository(type);
        const repository = new ListFoldersByParentIdsRepository(foldersCache, gateway, type);
        const repositoryWithLoadedCache = new ListFoldersByParentIdsRepositoryWithLoadedCache(
            loadedCache,
            repository
        );
        const useCase = new ListFoldersByParentIdsUseCase(repositoryWithLoadedCache);
        const useCaseWithLoading = new ListFoldersByParentIdsUseCaseWithLoading(
            loadingRepository,
            loadedCache,
            useCase
        );

        return {
            useCase: useCaseWithLoading,
            folders: foldersCache,
            loading: loadingRepository
        };
    }
}
