import { useMemo, useCallback } from "react";
import { useApolloClient } from "@apollo/react-hooks";
import { GetSettingsRepository } from "./GetSettings.repository";
import { GetSettingsGqlGateway } from "./GetSettings.gateway";
import { settingsCache } from "~/shared/settingsCache";

export const useGetWebsiteBuilderSettings = () => {
    const client = useApolloClient();

    const repository = useMemo(() => {
        return new GetSettingsRepository(settingsCache, new GetSettingsGqlGateway(client));
    }, []);

    const getSettings = useCallback(() => {
        return repository.execute();
    }, [repository]);

    return { getSettings };
};
