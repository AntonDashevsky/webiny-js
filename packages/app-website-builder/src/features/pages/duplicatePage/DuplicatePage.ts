import { loadingRepositoryFactory, metaRepositoryFactory } from "@webiny/app-utils";
import type { IDuplicatePageGateway } from "~/features/pages/duplicatePage/IDuplicatePageGateway.js";
import type { IDuplicatePageUseCase } from "~/features/pages/duplicatePage/IDuplicatePageUseCase.js";
import { DuplicatePageRepository } from "~/features/pages/duplicatePage/DuplicatePageRepository.js";
import { DuplicatePageUseCase } from "~/features/pages/duplicatePage/DuplicatePageUseCase.js";
import { DuplicatePageUseCaseWithLoading } from "~/features/pages/duplicatePage/DuplicatePageUseCaseWithLoading.js";
import { pageListCache } from "~/domain/Page/index.js";

export class DuplicatePage {
    public static getInstance(gateway: IDuplicatePageGateway): IDuplicatePageUseCase {
        const loadingRepository = loadingRepositoryFactory.getRepository("WbPage");
        const metaRepository = metaRepositoryFactory.getRepository("WbPage");
        const repository = new DuplicatePageRepository(pageListCache, metaRepository, gateway);
        const useCase = new DuplicatePageUseCase(repository);
        return new DuplicatePageUseCaseWithLoading(loadingRepository, useCase);
    }
}
