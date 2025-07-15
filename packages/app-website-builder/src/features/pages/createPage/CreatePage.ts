import { loadingRepositoryFactory } from "@webiny/app-utils";
import { ICreatePageUseCase } from "./ICreatePageUseCase.js";
import { ICreatePageGateway } from "./ICreatePageGateway.js";
import { CreatePageRepository } from "./CreatePageRepository.js";
import { CreatePageUseCase } from "./CreatePageUseCase.js";
import { CreatePageUseCaseWithLoading } from "./CreatePageUseCaseWithLoading.js";
import { pageListCache } from "~/domain/Page/index.js";

export class CreatePage {
    public static getInstance(gateway: ICreatePageGateway): ICreatePageUseCase {
        const loadingRepository = loadingRepositoryFactory.getRepository("WbPage");
        const repository = new CreatePageRepository(pageListCache, gateway);
        const useCase = new CreatePageUseCase(repository);
        return new CreatePageUseCaseWithLoading(loadingRepository, useCase);
    }
}
