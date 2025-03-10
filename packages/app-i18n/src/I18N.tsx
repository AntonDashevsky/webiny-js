import React, { Fragment, memo } from "react";
import { plugins } from "@webiny/plugins";
import { Provider, Plugins } from "@webiny/app-admin";
import { I18NProvider as ContextProvider } from "./contexts/I18N";
import { HasPermission } from "@webiny/app-security";
import { AddRoute } from "@webiny/app-admin";
import { Layout } from "@webiny/app-admin";
import { LocalesView } from "./admin/views/locales";
import i18nPlugins from "./admin/plugins";
import { AdminConfig } from "@webiny/app-admin";

const { Menu } = AdminConfig;

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

    /**
     * TODO @ts-refactor
     * Provider.hoc expects ComponentType.
     */
    return (
        <Fragment>
            <Provider hoc={I18NProviderHOC} />
            <Plugins>
                <HasPermission name={"i18n.locale"}>
                    <AddRoute exact path={"/i18n/locales"}>
                        <Layout title={"I18N - Locales"}>
                            <LocalesView />
                        </Layout>
                    </AddRoute>
                    <Menu
                        name="settings.i18n"
                        parent={"settings"}
                        element={<Menu.Item label={"Languages"} />}
                    />
                    <Menu
                        name="settings.i18n.locales"
                        parent={"settings"}
                        element={<Menu.Item label={"Locales"} path={"/i18n/locales"} />}
                    />
                </HasPermission>
            </Plugins>
        </Fragment>
    );
};

export const I18N = memo(I18NExtension);
