import type { LoadingRepository } from "@webiny/app-utils";
import { loadingRepositoryFactory } from "@webiny/app-utils";
import { pageRevisionsCacheFactory } from "~/domain/PageRevision/index.js";
import type { IGetPageRevisionsUseCase } from "~/features/pages/getPageRevisions/IGetPageRevisionsUseCase.js";
import type { IGetPageRevisionsGateway } from "~/features/pages/getPageRevisions/IGetPageRevisionsGateway.js";
import { GetPageRevisionsRepository } from "~/features/pages/getPageRevisions/GetPageRevisionsRepository.js";
import { GetPageRevisionsUseCase } from "~/features/pages/getPageRevisions/GetPageRevisionsUseCase.js";
import { GetPageRevisionsUseCaseWithLoading } from "~/features/pages/getPageRevisions/GetPageRevisionsUseCaseWithLoading.js";

interface IGetPageInstance {
    useCase: IGetPageRevisionsUseCase;
    loading: LoadingRepository;
}

export class GetPageRevisions {
    public static getInstance(gateway: IGetPageRevisionsGateway): IGetPageInstance {
        const pageRevisionsCache = pageRevisionsCacheFactory.getCache();
        const loadingRepository = loadingRepositoryFactory.getRepository("WbPageRevisions");
        const repository = new GetPageRevisionsRepository(pageRevisionsCache, gateway);
        const useCase = new GetPageRevisionsUseCase(repository);
        const useCaseWithLoading = new GetPageRevisionsUseCaseWithLoading(
            loadingRepository,
            useCase
        );

        return {
            useCase: useCaseWithLoading,
            loading: loadingRepository
        };
    }
}
