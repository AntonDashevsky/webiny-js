import React, { useEffect, useState } from "react";
import { Button, useToast } from "@webiny/admin-ui";
import { useEcommerceApiProvider } from "~/features";
import { IEcommerceApi } from "~/ecommerce";
import { useIntegrationsDialog } from "~/modules/integrations/useIntegrationsDialog";

const warningShown = new Set<string>();

export const useEcommerceApi = (pluginName: string) => {
    const { showIntegrationsDialog } = useIntegrationsDialog();
    const { showWarningToast, hideToast } = useToast();
    const provider = useEcommerceApiProvider();
    const [api, setApi] = useState<IEcommerceApi | undefined>(undefined);

    useEffect(() => {
        provider
            .getApi(pluginName)
            .then(api => {
                setApi(api);
            })
            .catch(error => {
                if (warningShown.has(pluginName)) {
                    return;
                }

                warningShown.add(pluginName);
                const id = showWarningToast({
                    title: "Integration not configured!",
                    description: error.message,
                    actions: (
                        <Button
                            variant="primary"
                            text={"Configure now!"}
                            onClick={() => {
                                showIntegrationsDialog();
                                hideToast(id);
                            }}
                        />
                    )
                });
            });
    }, []);

    return { api };
};
