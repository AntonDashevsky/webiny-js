import type { ILoadingRepository } from "@webiny/app-utils";
import { LoadingActionsEnum } from "~/types.js";
import type { IListFoldersUseCase } from "./IListFoldersUseCase.js";

export class ListFoldersUseCaseWithLoading implements IListFoldersUseCase {
    private loadingRepository: ILoadingRepository;
    private useCase: IListFoldersUseCase;

    constructor(loadingRepository: ILoadingRepository, useCase: IListFoldersUseCase) {
        this.loadingRepository = loadingRepository;
        this.useCase = useCase;
    }

    async execute() {
        await this.loadingRepository.runCallBack(this.useCase.execute(), LoadingActionsEnum.list);
    }
}
