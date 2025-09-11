import { useCallback, useMemo } from "react";
import { useApolloClient } from "@apollo/react-hooks";
import { GetSettingsRepository } from "./GetSettings.repository";
import { GetSettingsGateway } from "./GetSettings.gateway";
import { settingsCache } from "~/shared/settingsCache";

export const useGetEcommerceSettings = () => {
    const client = useApolloClient();

    const repository = useMemo(() => {
        return new GetSettingsRepository(settingsCache, new GetSettingsGateway(client));
    }, []);

    const getSettings = useCallback(() => {
        return repository.execute();
    }, [repository]);

    return { getSettings };
};
