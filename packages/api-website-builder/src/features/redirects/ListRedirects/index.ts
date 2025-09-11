import type { WbRedirectsStorageOperations } from "~/context/redirects/redirects.types.js";
import { ListRedirects } from "./ListRedirects.js";

interface ListRedirectsUseCasesParams {
    listOperation: WbRedirectsStorageOperations["list"];
}

export const getListRedirectsUseCase = (params: ListRedirectsUseCasesParams) => {
    const listRedirectsUseCase = new ListRedirects(params.listOperation);

    return {
        listRedirectsUseCase
    };
};
