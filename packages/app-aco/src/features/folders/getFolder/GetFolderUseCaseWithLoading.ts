import type { GetFolderParams, IGetFolderUseCase } from "./IGetFolderUseCase.js";
import type { ILoadingRepository } from "@webiny/app-utils";
import { LoadingActionsEnum } from "~/types.js";

export class GetFolderUseCaseWithLoading implements IGetFolderUseCase {
    private loadingRepository: ILoadingRepository;
    private useCase: IGetFolderUseCase;

    constructor(loadingRepository: ILoadingRepository, useCase: IGetFolderUseCase) {
        this.loadingRepository = loadingRepository;
        this.useCase = useCase;
    }

    async execute(params: GetFolderParams) {
        await this.loadingRepository.runCallBack(
            this.useCase.execute(params),
            LoadingActionsEnum.get
        );
    }
}
