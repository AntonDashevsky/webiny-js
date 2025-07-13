import { LoadingRepository, loadingRepositoryFactory } from "@webiny/app-utils";
import { pageRevisionsCacheFactory } from "~/domains/PageRevision/index.js";
import { IGetPageRevisionsUseCase } from "~/features/pages/getPageRevisions/IGetPageRevisionsUseCase";
import { IGetPageRevisionsGateway } from "~/features/pages/getPageRevisions/IGetPageRevisionsGateway";
import { GetPageRevisionsRepository } from "~/features/pages/getPageRevisions/GetPageRevisionsRepository";
import { GetPageRevisionsUseCase } from "~/features/pages/getPageRevisions/GetPageRevisionsUseCase";
import { GetPageRevisionsUseCaseWithLoading } from "~/features/pages/getPageRevisions/GetPageRevisionsUseCaseWithLoading";

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
