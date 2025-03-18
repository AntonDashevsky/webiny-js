import React, { lazy, Suspense } from "react";
import { AdminConfig, Plugins } from "@webiny/app-admin";
import { SecureRoute } from "@webiny/app-security";
import { AdminLayout } from "@webiny/app-admin/components/AdminLayout";
import Helmet from "react-helmet";
import { usePermission } from "~/hooks/usePermission";
import { CircularProgress } from "@webiny/ui/Progress";
import { RouterConfig } from "@webiny/app/config/RouterConfig";

const { Menu } = AdminConfig;
const { Route } = RouterConfig;

const Settings = lazy(
    () =>
        import(
            /* webpackChunkName: "MailerModuleSettings" */
            "~/views/settings"
        )
);

interface LoaderProps {
    children: React.ReactElement;
}

const Loader = ({ children, ...props }: LoaderProps) => (
    <Suspense fallback={<CircularProgress />}>{React.cloneElement(children, props)}</Suspense>
);

const MailerSettings = () => {
    const { canChangeSettings } = usePermission();

    const changeSettings = canChangeSettings();

    if (!changeSettings) {
        return null;
    }

    return (
        <>
            <AdminConfig>
                <Menu
                    name={"mailer.settings"}
                    parent={"settings"}
                    element={<Menu.Group label={"Mailer"} />}
                />
                <Menu
                    name={"mailer.settings.general"}
                    parent={"settings"}
                    element={<Menu.Link label={"Settings"} path={"/mailer/settings"} />}
                />
            </AdminConfig>
            <RouterConfig>
                <Route
                    name={"mailer.settings"}
                    exact
                    path={"/mailer/settings"}
                    element={
                        <SecureRoute permission={"mailer.settings"}>
                            <AdminLayout>
                                <Helmet title={"Mailer - Settings"} />
                                <Loader>
                                    <Settings />
                                </Loader>
                            </AdminLayout>
                        </SecureRoute>
                    }
                />
            </RouterConfig>
        </>
    );
};

export const Module = () => {
    return (
        <Plugins>
            <MailerSettings />
        </Plugins>
    );
};
