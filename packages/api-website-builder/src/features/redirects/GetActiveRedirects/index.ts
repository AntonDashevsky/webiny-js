import type { WbRedirectsStorageOperations } from "~/context/redirects/redirects.types.js";
import { GetActiveRedirects } from "./GetActiveRedirects.js";

interface ListRedirectsUseCasesParams {
    listOperation: WbRedirectsStorageOperations["list"];
}

export const getGetActiveRedirectsUseCase = (params: ListRedirectsUseCasesParams) => {
    return new GetActiveRedirects(params.listOperation);
};
