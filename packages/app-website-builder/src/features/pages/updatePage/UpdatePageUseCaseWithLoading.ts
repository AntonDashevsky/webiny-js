import type { ILoadingRepository } from "@webiny/app-utils";
import type { IUpdatePageUseCase } from "./IUpdatePageUseCase.js";
import { type UpdatePageParams } from "./IUpdatePageUseCase.js";
import { loadingActions } from "~/constants.js";

export class UpdatePageUseCaseWithLoading implements IUpdatePageUseCase {
    private loadingRepository: ILoadingRepository;
    private useCase: IUpdatePageUseCase;

    constructor(loadingRepository: ILoadingRepository, useCase: IUpdatePageUseCase) {
        this.loadingRepository = loadingRepository;
        this.useCase = useCase;
    }

    async execute(params: UpdatePageParams) {
        await this.loadingRepository.runCallBack(
            this.useCase.execute(params),
            loadingActions.update
        );
    }
}
