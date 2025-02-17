import { useCallback, useMemo } from "react";
import { useApolloClient } from "@apollo/react-hooks";
import { CreatePageTemplateFromPageRepository } from "~/features/pageTemplate/createPageTemplateFromPage/CreatePageTemplateFromPageRepository.js";
import { pageTemplateCache } from "~/features/pageTemplate/pageTemplateCache.js";
import { PageTemplateInputDto } from "./PageTemplateInputDto.js";
import { CreatePageTemplateFromPageGqlGateway } from "~/features/pageTemplate/createPageTemplateFromPage/CreatePageTemplateFromPageGqlGateway.js";

export const useCreatePageTemplateFromPage = () => {
    const client = useApolloClient();

    const repository = useMemo(() => {
        const gateway = new CreatePageTemplateFromPageGqlGateway(client);

        return new CreatePageTemplateFromPageRepository(gateway, pageTemplateCache);
    }, [client]);

    const createPageTemplateFromPage = useCallback(
        (pageId: string, pageTemplate: PageTemplateInputDto) => {
            return repository.execute(pageId, pageTemplate);
        },
        [repository]
    );

    return { createPageTemplateFromPage };
};
