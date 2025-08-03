import { loadingRepositoryFactory } from "@webiny/app-utils";
import type { IUnpublishPageUseCase } from "~/features/pages/unpublishPage/IUnpublishPageUseCase.js";
import type { IUnpublishPageGateway } from "~/features/pages/unpublishPage/IUnpublishPageGateway.js";
import { UnpublishPageRepository } from "~/features/pages/unpublishPage/UnpublishPageRepository.js";
import { UnpublishPageUseCase } from "~/features/pages/unpublishPage/UnpublishPageUseCase.js";
import { UnpublishPageUseCaseWithLoading } from "~/features/pages/unpublishPage/UnpublishPageUseCaseWithLoading.js";
import { pageListCache, fullPageCache } from "~/domain/Page/index.js";
import { WB_PAGE_APP } from "~/constants";

export class UnpublishPage {
    public static getInstance(gateway: IUnpublishPageGateway): IUnpublishPageUseCase {
        const loadingRepository = loadingRepositoryFactory.getRepository(WB_PAGE_APP);
        const repository = new UnpublishPageRepository(pageListCache, fullPageCache, gateway);
        const useCase = new UnpublishPageUseCase(repository);
        return new UnpublishPageUseCaseWithLoading(loadingRepository, useCase);
    }
}
