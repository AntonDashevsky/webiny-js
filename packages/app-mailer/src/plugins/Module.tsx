import React, { lazy, Suspense } from "react";
import { AdminConfig, Plugins, Layout } from "@webiny/app-admin";
import { HasPermission } from "@webiny/app-security";
import Helmet from "react-helmet";
import { usePermission } from "~/hooks/usePermission.js";
import { CircularProgress } from "@webiny/ui/Progress/index.js";

const { Menu, Route } = AdminConfig;

const Settings = lazy(
    () =>
        import(
            /* webpackChunkName: "MailerModuleSettings" */
            "~/views/settings/index.js"
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
        <AdminConfig>
            <HasPermission name={"mailer.settings"}>
                <Route
                    name={"mailer.settings"}
                    exact
                    path={"/mailer/settings"}
                    element={
                        <Layout>
                            <Helmet title={"Mailer - Settings"} />
                            <Loader>
                                <Settings />
                            </Loader>
                        </Layout>
                    }
                />
                <Menu
                    name={"mailer.settings"}
                    parent={"settings"}
                    element={<Menu.Group text={"Mailer"} />}
                />
                <Menu
                    name={"mailer.settings.general"}
                    parent={"settings"}
                    element={<Menu.Link text={"Settings"} to={"/mailer/settings"} />}
                />
            </HasPermission>
        </AdminConfig>
    );
};

export const Module = () => {
    return (
        <Plugins>
            <MailerSettings />
        </Plugins>
    );
};
