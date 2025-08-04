import { loadingRepositoryFactory } from "@webiny/app-utils";
import type { ICreatePageRevisionFromGateway } from "~/features/pages/createPageRevisionFrom/ICreatePageRevisionFromGateway.js";
import type { ICreatePageRevisionFromUseCase } from "~/features/pages/createPageRevisionFrom/ICreatePageRevisionFromUseCase.js";
import { CreatePageRevisionFromRepository } from "~/features/pages/createPageRevisionFrom/CreatePageRevisionFromRepository.js";
import { CreatePageRevisionFromUseCase } from "~/features/pages/createPageRevisionFrom/CreatePageRevisionFromUseCase.js";
import { CreatePageRevisionFromUseCaseWithLoading } from "~/features/pages/createPageRevisionFrom/CreatePageRevisionFromUseCaseWithLoading.js";
import { pageListCache } from "~/domain/Page/index.js";

export class CreatePageRevisionFrom {
    public static getInstance(
        gateway: ICreatePageRevisionFromGateway
    ): ICreatePageRevisionFromUseCase {
        const loadingRepository = loadingRepositoryFactory.getRepository("WbPage");
        const repository = new CreatePageRevisionFromRepository(pageListCache, gateway);
        const useCase = new CreatePageRevisionFromUseCase(repository);
        return new CreatePageRevisionFromUseCaseWithLoading(loadingRepository, useCase);
    }
}
