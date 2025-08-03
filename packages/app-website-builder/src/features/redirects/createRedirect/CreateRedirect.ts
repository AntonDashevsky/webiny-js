import { loadingRepositoryFactory } from "@webiny/app-utils";
import type { ICreateRedirectUseCase } from "./ICreateRedirectUseCase.js";
import type { ICreateRedirectGateway } from "./ICreateRedirectGateway.js";
import { CreateRedirectRepository } from "./CreateRedirectRepository.js";
import { CreateRedirectUseCase } from "./CreateRedirectUseCase.js";
import { CreateRedirectUseCaseWithLoading } from "./CreateRedirectUseCaseWithLoading.js";
import { redirectListCache } from "~/domain/Redirect/index.js";
import { WB_REDIRECTS_APP } from "~/constants";

export class CreateRedirect {
    public static getInstance(gateway: ICreateRedirectGateway): ICreateRedirectUseCase {
        const loadingRepository = loadingRepositoryFactory.getRepository(WB_REDIRECTS_APP);
        const repository = new CreateRedirectRepository(redirectListCache, gateway);
        const useCase = new CreateRedirectUseCase(repository);
        return new CreateRedirectUseCaseWithLoading(loadingRepository, useCase);
    }
}
