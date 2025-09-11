import { useMemo, useCallback } from "react";
import { useApolloClient } from "@apollo/react-hooks";
import { UpdateSettingsRepository } from "./UpdateSettings.repository";
import { settingsCache } from "~/shared/settingsCache";
import type { IWebsiteBuilderSettings } from "~/features/settings/IWebsiteBuilderSettings";
import { UpdateSettingsGqlGateway } from "./UpdateSettings.gateway";

export const useUpdateWebsiteBuilderSettings = () => {
    const client = useApolloClient();

    const repository = useMemo(() => {
        return new UpdateSettingsRepository(settingsCache, new UpdateSettingsGqlGateway(client));
    }, []);

    const updateSettings = useCallback(
        (settings: IWebsiteBuilderSettings) => {
            return repository.execute(settings);
        },
        [repository]
    );

    return { updateSettings };
};
