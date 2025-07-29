import type { ILoadingRepository } from "@webiny/app-utils";
import type { CreateFolderParams, ICreateFolderUseCase } from "./ICreateFolderUseCase";
import { LoadingActionsEnum } from "~/types";

export class CreateFolderUseCaseWithLoading implements ICreateFolderUseCase {
    private loadingRepository: ILoadingRepository;
    private useCase: ICreateFolderUseCase;

    constructor(loadingRepository: ILoadingRepository, useCase: ICreateFolderUseCase) {
        this.loadingRepository = loadingRepository;
        this.useCase = useCase;
    }

    async execute(params: CreateFolderParams) {
        await this.loadingRepository.runCallBack(
            this.useCase.execute(params),
            LoadingActionsEnum.create
        );
    }
}
