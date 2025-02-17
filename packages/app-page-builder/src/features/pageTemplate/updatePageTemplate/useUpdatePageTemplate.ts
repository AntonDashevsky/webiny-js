import { useCallback, useMemo } from "react";
import { useApolloClient } from "@apollo/react-hooks";
import { pageTemplateCache } from "~/features/pageTemplate/pageTemplateCache.js";
import { UpdatePageTemplateRepository } from "~/features/pageTemplate/updatePageTemplate/UpdatePageTemplateRepository.js";
import { UpdatePageTemplateGqlGateway } from "~/features/pageTemplate/updatePageTemplate/UpdatePageTemplateGqlGateway.js";
import { UpdatePageTemplateDto } from "~/features/pageTemplate/updatePageTemplate/UpdatePageTemplateDto.js";

export const useUpdatePageTemplate = () => {
    const client = useApolloClient();

    const repository = useMemo(() => {
        const gateway = new UpdatePageTemplateGqlGateway(client);

        return new UpdatePageTemplateRepository(gateway, pageTemplateCache);
    }, [client]);

    const updatePageTemplate = useCallback(
        (pageTemplate: UpdatePageTemplateDto) => {
            return repository.execute(pageTemplate);
        },
        [repository]
    );

    return { updatePageTemplate };
};
