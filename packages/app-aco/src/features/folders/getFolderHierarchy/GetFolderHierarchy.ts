import { type LoadingRepository, loadingRepositoryFactory } from "@webiny/app-utils";
import { type IGetFolderHierarchyUseCase } from "./IGetFolderHierarchyUseCase.js";
import { type IGetFolderHierarchyGateway } from "./IGetFolderHierarchyGateway.js";
import { GetFolderHierarchyUseCaseWithLoading } from "./GetFolderHierarchyUseCaseWithLoading.js";
import { GetFolderHierarchyRepository } from "./GetFolderHierarchyRepository.js";
import { GetFolderHierarchyUseCase } from "./GetFolderHierarchyUseCase.js";
import { folderCacheFactory, type ListCache, loadedFolderCacheFactory } from "../cache/index.js";
import { type Folder } from "../Folder.js";

interface IGetFolderHierarchyInstance {
    useCase: IGetFolderHierarchyUseCase;
    folders: ListCache<Folder>;
    loading: LoadingRepository;
}

export class GetFolderHierarchy {
    public static getInstance(
        type: string,
        gateway: IGetFolderHierarchyGateway
    ): IGetFolderHierarchyInstance {
        const foldersCache = folderCacheFactory.getCache(type);
        const loadedCache = loadedFolderCacheFactory.getCache(type);
        const loadingRepository = loadingRepositoryFactory.getRepository(type);
        const repository = new GetFolderHierarchyRepository(
            foldersCache,
            loadedCache,
            gateway,
            type
        );
        const useCase = new GetFolderHierarchyUseCase(repository);
        const useCaseWithLoading = new GetFolderHierarchyUseCaseWithLoading(
            loadingRepository,
            useCase
        );

        return {
            useCase: useCaseWithLoading,
            folders: foldersCache,
            loading: loadingRepository
        };
    }
}
