import { type ILoadingRepository } from "@webiny/app-utils";
import { LoadingActionsEnum } from "~/types.js";
import { type DeleteFolderParams, type IDeleteFolderUseCase } from "./IDeleteFolderUseCase.js";

export class DeleteFolderUseCaseWithLoading implements IDeleteFolderUseCase {
    private loadingRepository: ILoadingRepository;
    private useCase: IDeleteFolderUseCase;

    constructor(loadingRepository: ILoadingRepository, useCase: IDeleteFolderUseCase) {
        this.loadingRepository = loadingRepository;
        this.useCase = useCase;
    }

    async execute(params: DeleteFolderParams) {
        await this.loadingRepository.runCallBack(
            this.useCase.execute(params),
            LoadingActionsEnum.delete
        );
    }
}
