import { type ILoadingRepository } from "@webiny/app-utils";
import {
    type IListFoldersByParentIdsUseCase,
    type ListFoldersByParentIdsUseCaseParams
} from "./IListFoldersByParentIdsUseCase.js";
import { type LoadedCache } from "~/features/index.js";
import { LoadingActionsEnum } from "~/types.js";

export class ListFoldersByParentIdsUseCaseWithLoading implements IListFoldersByParentIdsUseCase {
    private loadingRepository: ILoadingRepository;
    private loadedCache: LoadedCache;
    private useCase: IListFoldersByParentIdsUseCase;

    constructor(
        loadingRepository: ILoadingRepository,
        loadedCache: LoadedCache,
        useCase: IListFoldersByParentIdsUseCase
    ) {
        this.loadingRepository = loadingRepository;
        this.loadedCache = loadedCache;
        this.useCase = useCase;
    }

    async execute(params: ListFoldersByParentIdsUseCaseParams) {
        let action: string = LoadingActionsEnum.init;

        if (params.parentIds?.length) {
            action = params.parentIds
                .filter(parentId => !this.loadedCache.getItems().includes(parentId))
                .join(":");
        }

        if (action) {
            await this.loadingRepository.runCallBack(this.useCase.execute(params), action);
        } else {
            await this.useCase.execute(params);
        }
    }
}
