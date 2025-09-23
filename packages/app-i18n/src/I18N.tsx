import React, { Fragment, memo } from "react";
import { plugins } from "@webiny/plugins";
import { Provider } from "@webiny/app-admin";
import { I18NProvider as ContextProvider } from "./contexts/I18N/index.js";
import { HasPermission } from "@webiny/app-security";
import { Layout } from "@webiny/app-admin";
import { LocalesView } from "./admin/views/locales/index.js";
import i18nPlugins from "./admin/plugins/index.js";
import { AdminConfig } from "@webiny/app-admin";

const { Menu, Route } = AdminConfig;

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
            <AdminConfig>
                <HasPermission name={"i18n.locale"}>
                    <Route
                        name={"i18n.locales"}
                        path={"/i18n/locales"}
                        element={
                            <Layout title={"I18N - Locales"}>
                                <LocalesView />
                            </Layout>
                        }
                    />
                    <Menu
                        name="i18n.settings"
                        parent={"settings"}
                        element={<Menu.Group text={"Languages"} />}
                    />
                    <Menu
                        name="i18n.settings.locales"
                        parent={"settings"}
                        element={<Menu.Link text={"Locales"} to={"/i18n/locales"} />}
                    />
                </HasPermission>
            </AdminConfig>
        </Fragment>
    );
};

export const I18N = memo(I18NExtension);
