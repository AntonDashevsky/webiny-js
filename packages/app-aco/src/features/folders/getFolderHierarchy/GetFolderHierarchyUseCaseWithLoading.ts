import type { ILoadingRepository } from "@webiny/app-utils";
import type {
    GetFolderHierarchyUseCaseParams,
    IGetFolderHierarchyUseCase
} from "./IGetFolderHierarchyUseCase.js";
import { LoadingActionsEnum } from "~/types.js";

export class GetFolderHierarchyUseCaseWithLoading implements IGetFolderHierarchyUseCase {
    private loadingRepository: ILoadingRepository;
    private useCase: IGetFolderHierarchyUseCase;

    constructor(loadingRepository: ILoadingRepository, useCase: IGetFolderHierarchyUseCase) {
        this.loadingRepository = loadingRepository;
        this.useCase = useCase;
    }

    async execute(params: GetFolderHierarchyUseCaseParams) {
        await this.loadingRepository.runCallBack(
            this.useCase.execute(params),
            LoadingActionsEnum.init
        );
    }
}
