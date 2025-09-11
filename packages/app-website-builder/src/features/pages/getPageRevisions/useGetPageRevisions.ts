import { useCallback, useMemo } from "react";
import { useApolloClient } from "@apollo/react-hooks";
import { GetPageRevisionsGqlGateway } from "./GetPageRevisionsGqlGateway";
import type { GetPageRevisionsParams } from "./IGetPageRevisionsUseCase";
import { GetPageRevisions } from "./GetPageRevisions";

export const useGetPageRevisions = () => {
    const client = useApolloClient();
    const gateway = new GetPageRevisionsGqlGateway(client);

    const getPageRevisionsUseCase = useMemo(() => {
        return GetPageRevisions.getInstance(gateway);
    }, [gateway]);

    const getPageRevisions = useCallback(
        (params: GetPageRevisionsParams) => {
            return getPageRevisionsUseCase.useCase.execute(params);
        },
        [getPageRevisionsUseCase]
    );

    return {
        getPageRevisions,
        loading: getPageRevisionsUseCase.loading.isLoading("WbPageRevisions")
    };
};
