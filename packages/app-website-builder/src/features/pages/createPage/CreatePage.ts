import { loadingRepositoryFactory } from "@webiny/app-utils";
import type { ICreatePageUseCase } from "./ICreatePageUseCase.js";
import type { ICreatePageGateway } from "./ICreatePageGateway.js";
import { CreatePageRepository } from "./CreatePageRepository.js";
import { CreatePageUseCase } from "./CreatePageUseCase.js";
import { CreatePageUseCaseWithLoading } from "./CreatePageUseCaseWithLoading.js";
import { pageListCache } from "~/domain/Page/index.js";
import { WB_PAGE_APP } from "~/constants";

export class CreatePage {
    public static getInstance(gateway: ICreatePageGateway): ICreatePageUseCase {
        const loadingRepository = loadingRepositoryFactory.getRepository(WB_PAGE_APP);
        const repository = new CreatePageRepository(pageListCache, gateway);
        const useCase = new CreatePageUseCase(repository);
        return new CreatePageUseCaseWithLoading(loadingRepository, useCase);
    }
}
