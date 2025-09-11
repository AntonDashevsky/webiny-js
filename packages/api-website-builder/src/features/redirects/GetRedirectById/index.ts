import { GetRedirectById } from "./GetRedirectById.js";
import type { WbRedirectsStorageOperations } from "~/context/redirects/redirects.types.js";

interface GetRedirectByIdUseCasesParams {
    getOperation: WbRedirectsStorageOperations["getById"];
}

export const getGetRedirectByIdUseCase = (params: GetRedirectByIdUseCasesParams) => {
    const getRedirectByIdUseCase = new GetRedirectById(params.getOperation);

    return {
        getRedirectByIdUseCase
    };
};
