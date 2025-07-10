import { ILoadingRepository } from "@webiny/app-utils";
import { CreatePageParams, ICreatePageUseCase } from "./ICreatePageUseCase.js";
import { loadingActions } from "~/constants.js";

export class CreatePageUseCaseWithLoading implements ICreatePageUseCase {
    private loadingRepository: ILoadingRepository;
    private useCase: ICreatePageUseCase;

    constructor(loadingRepository: ILoadingRepository, useCase: ICreatePageUseCase) {
        this.loadingRepository = loadingRepository;
        this.useCase = useCase;
    }

    async execute(params: CreatePageParams) {
        return await this.loadingRepository.runCallBack(
            this.useCase.execute(params),
            loadingActions.create
        );
    }
}
