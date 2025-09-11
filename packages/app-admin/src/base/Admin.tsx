import React from "react";
import { App } from "@webiny/app";
import { WcpProvider } from "@webiny/app-wcp";
import type { ApolloClientFactory } from "./providers/ApolloProvider.js";
import { createApolloProvider } from "./providers/ApolloProvider.js";
import { Base } from "./Base.js";
import { createTelemetryProvider } from "./providers/TelemetryProvider.js";
import { createUiStateProvider } from "./providers/UiStateProvider.js";
import { createAdminUiStateProvider } from "./providers/AdminUiStateProvider.js";
import { createUiProviders } from "./providers/UiProviders.js";
import { createDialogsProvider } from "~/components/Dialogs/DialogsContext.js";
import { DefaultIcons, IconPickerConfigProvider } from "~/components/IconPicker/config/index.js";

export interface AdminProps {
    createApolloClient: ApolloClientFactory;
    children?: React.ReactNode;
}

export const Admin = ({ children, createApolloClient }: AdminProps) => {
    const ApolloProvider = createApolloProvider(createApolloClient);
    const TelemetryProvider = createTelemetryProvider();
    const UIProviders = createUiProviders();
    const UiStateProvider = createUiStateProvider();
    const AdminUiStateProvider = createAdminUiStateProvider();
    const DialogsProvider = createDialogsProvider();

    return (
        <ApolloProvider>
            <WcpProvider>
                <App
                    providers={[
                        TelemetryProvider,
                        UIProviders,
                        UiStateProvider,
                        DialogsProvider,
                        IconPickerConfigProvider,
                        AdminUiStateProvider
                    ]}
                >
                    <Base />
                    <DefaultIcons />
                    {children}
                </App>
            </WcpProvider>
        </ApolloProvider>
    );
};
