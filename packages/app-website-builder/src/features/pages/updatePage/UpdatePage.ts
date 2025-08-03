import { loadingRepositoryFactory } from "@webiny/app-utils";
import type { IUpdatePageGateway } from "~/features/pages/updatePage/IUpdatePageGateway.js";
import type { IUpdatePageUseCase } from "~/features/pages/updatePage/IUpdatePageUseCase.js";
import { UpdatePageRepository } from "~/features/pages/updatePage/UpdatePageRepository.js";
import { UpdatePageUseCase } from "~/features/pages/updatePage/UpdatePageUseCase.js";
import { UpdatePageUseCaseWithLoading } from "~/features/pages/updatePage/UpdatePageUseCaseWithLoading.js";
import { fullPageCache, pageListCache } from "~/domain/Page/index.js";
import { WB_PAGE_APP } from "~/constants";

export class UpdatePage {
    public static getInstance(gateway: IUpdatePageGateway): IUpdatePageUseCase {
        const loadingRepository = loadingRepositoryFactory.getRepository(WB_PAGE_APP);
        const repository = new UpdatePageRepository(pageListCache, fullPageCache, gateway);
        const useCase = new UpdatePageUseCase(repository);
        return new UpdatePageUseCaseWithLoading(loadingRepository, useCase);
    }
}
