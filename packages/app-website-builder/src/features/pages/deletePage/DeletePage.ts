import { loadingRepositoryFactory, metaRepositoryFactory } from "@webiny/app-utils";
import type { IDeletePageGateway } from "~/features/pages/deletePage/IDeletePageGateway.js";
import type { IDeletePageUseCase } from "~/features/pages/deletePage/IDeletePageUseCase.js";
import { DeletePageRepository } from "~/features/pages/deletePage/DeletePageRepository.js";
import { DeletePageUseCase } from "~/features/pages/deletePage/DeletePageUseCase.js";
import { DeletePageUseCaseWithLoading } from "~/features/pages/deletePage/DeletePageUseCaseWithLoading.js";
import { pageListCache } from "~/domain/Page/index.js";
import { WB_PAGE_APP } from "~/constants";

export class DeletePage {
    public static getInstance(gateway: IDeletePageGateway): IDeletePageUseCase {
        const loadingRepository = loadingRepositoryFactory.getRepository(WB_PAGE_APP);
        const metaRepository = metaRepositoryFactory.getRepository(WB_PAGE_APP);
        const repository = new DeletePageRepository(pageListCache, metaRepository, gateway);
        const useCase = new DeletePageUseCase(repository);
        return new DeletePageUseCaseWithLoading(loadingRepository, useCase);
    }
}
