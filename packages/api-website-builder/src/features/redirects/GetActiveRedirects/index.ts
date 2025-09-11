import type { WbRedirectsStorageOperations } from "~/context/redirects/redirects.types";
import { GetActiveRedirects } from "./GetActiveRedirects";

interface ListRedirectsUseCasesParams {
    listOperation: WbRedirectsStorageOperations["list"];
}

export const getGetActiveRedirectsUseCase = (params: ListRedirectsUseCasesParams) => {
    return new GetActiveRedirects(params.listOperation);
};
