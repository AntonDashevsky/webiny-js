import React from "react";
import { App } from "@webiny/app";
import { ThemeProvider } from "@webiny/app-theme";
import { WcpProvider } from "@webiny/app-wcp";
import { CircularProgress } from "@webiny/ui/Progress/index.js";
import { ApolloClientFactory, createApolloProvider } from "./providers/ApolloProvider.js";
import { Base } from "./Base.js";
import { createTelemetryProvider } from "./providers/TelemetryProvider.js";
import { createUiStateProvider } from "./providers/UiStateProvider.js";
import { SearchProvider } from "./ui/Search.js";
import { UserMenuProvider } from "./ui/UserMenu.js";
import { NavigationProvider } from "./ui/Navigation.js";
import { createDialogsProvider } from "~/components/Dialogs/DialogsContext.js";
import { DefaultIcons, IconPickerConfigProvider } from "~/components/IconPicker/config/index.js";

export interface AdminProps {
    createApolloClient: ApolloClientFactory;
    children?: React.ReactNode;
}

export const Admin = ({ children, createApolloClient }: AdminProps) => {
    const ApolloProvider = createApolloProvider(createApolloClient);
    const TelemetryProvider = createTelemetryProvider();
    const UiStateProvider = createUiStateProvider();
    const DialogsProvider = createDialogsProvider();

    return (
        <ApolloProvider>
            <ThemeProvider>
                <WcpProvider loader={<CircularProgress label={"Loading..."} />}>
                    <App
                        providers={[
                            TelemetryProvider,
                            UiStateProvider,
                            SearchProvider,
                            UserMenuProvider,
                            NavigationProvider,
                            DialogsProvider,
                            IconPickerConfigProvider
                        ]}
                    >
                        <Base />
                        <DefaultIcons />
                        {children}
                    </App>
                </WcpProvider>
            </ThemeProvider>
        </ApolloProvider>
    );
};
