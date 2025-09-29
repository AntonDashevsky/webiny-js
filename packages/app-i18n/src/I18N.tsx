import React, { memo } from "react";
import { plugins } from "@webiny/plugins";
import { Provider } from "@webiny/app-admin";
import { I18NProvider as ContextProvider } from "./contexts/I18N/index.js";
import i18nPlugins from "./admin/plugins/index.js";

interface I18NProviderProps {
    children: React.ReactNode;
}

const I18NProviderHOC = (Component: React.ComponentType<I18NProviderProps>) => {
    return function I18NProvider({ children }: I18NProviderProps) {
        return (
            <ContextProvider>
                <Component>{children}</Component>
            </ContextProvider>
        );
    };
};

const I18NExtension = () => {
    plugins.register(i18nPlugins());

    return <Provider hoc={I18NProviderHOC} />;
};

export const I18N = memo(I18NExtension);
