import { useMemo, useCallback } from "react";
import { useApolloClient } from "@apollo/react-hooks";
import { UpdateSettingsRepository } from "./UpdateSettings.repository";
import { settingsCache } from "~/shared/settingsCache";
import { UpdateSettingsGateway } from "./UpdateSettings.gateway";
import type { AllEcommerceSettings } from "~/features/ecommerce/settings/types";

export const useUpdateEcommerceSettings = () => {
    const client = useApolloClient();

    const repository = useMemo(() => {
        return new UpdateSettingsRepository(settingsCache, new UpdateSettingsGateway(client));
    }, []);

    const updateSettings = useCallback(
        (settings: AllEcommerceSettings) => {
            return repository.execute(settings);
        },
        [repository]
    );

    return { updateSettings };
};
