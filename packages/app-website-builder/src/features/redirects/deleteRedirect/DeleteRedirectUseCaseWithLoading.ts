import type { ILoadingRepository } from "@webiny/app-utils";
import type { IDeleteRedirectUseCase } from "./IDeleteRedirectUseCase.js";
import { type DeleteRedirectParams } from "./IDeleteRedirectUseCase.js";
import { loadingActions } from "~/constants.js";

export class DeleteRedirectUseCaseWithLoading implements IDeleteRedirectUseCase {
    private loadingRepository: ILoadingRepository;
    private useCase: IDeleteRedirectUseCase;

    constructor(loadingRepository: ILoadingRepository, useCase: IDeleteRedirectUseCase) {
        this.loadingRepository = loadingRepository;
        this.useCase = useCase;
    }

    async execute(params: DeleteRedirectParams) {
        await this.loadingRepository.runCallBack(
            this.useCase.execute(params),
            loadingActions.delete
        );
    }
}
