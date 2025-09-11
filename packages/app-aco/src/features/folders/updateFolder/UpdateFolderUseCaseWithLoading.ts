import type { ILoadingRepository } from "@webiny/app-utils";
import { LoadingActionsEnum } from "~/types.js";
import type { IUpdateFolderUseCase, UpdateFolderParams } from "./IUpdateFolderUseCase.js";

export class UpdateFolderUseCaseWithLoading implements IUpdateFolderUseCase {
    private loadingRepository: ILoadingRepository;
    private useCase: IUpdateFolderUseCase;

    constructor(loadingRepository: ILoadingRepository, useCase: IUpdateFolderUseCase) {
        this.loadingRepository = loadingRepository;
        this.useCase = useCase;
    }

    async execute(params: UpdateFolderParams) {
        await this.loadingRepository.runCallBack(
            this.useCase.execute(params),
            LoadingActionsEnum.update
        );
    }
}
