import { createBrowserHistory } from "history";
import React, { useMemo } from "react";
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
import { DiContainerProvider } from "@webiny/app/di/DiContainerProvider.js";
import { Container } from "@webiny/di-container";
import { RouterFeature } from "@webiny/app/features/router/feature.js";
import { DefaultRouteElementRegistry } from "@webiny/app/presentation/router/RouteElementRegistry.js";
import { RouterGateway } from "@webiny/app/features/router/abstractions.js";
import { HistoryRouterGateway } from "@webiny/app/features/router/HistoryRouterGateway.js";

const history = createBrowserHistory();

export interface AdminProps {
    createApolloClient: ApolloClientFactory;
    children?: React.ReactNode;
}

export const Admin = ({ children, createApolloClient }: AdminProps) => {
    const container = useMemo(() => new Container(), []);
    const ApolloProvider = createApolloProvider(createApolloClient);
    const TelemetryProvider = createTelemetryProvider();
    const UIProviders = createUiProviders();
    const UiStateProvider = createUiStateProvider();
    const AdminUiStateProvider = createAdminUiStateProvider();
    const DialogsProvider = createDialogsProvider();

    container.registerInstance(RouterGateway, new HistoryRouterGateway(history, ""));

    container.register(DefaultRouteElementRegistry).inSingletonScope();
    RouterFeature.register(container);

    return (
        <DiContainerProvider container={container}>
            <ApolloProvider>
                <WcpProvider>
                    <App
                        routes={[]}
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
        </DiContainerProvider>
    );
};
