import React, { lazy, Suspense } from "react";
import Helmet from "react-helmet";
import { AdminConfig, Plugins, Layout } from "@webiny/app-admin";
import { HasPermission } from "@webiny/app-security";
import { OverlayLoader } from "@webiny/admin-ui";
import { useRouter } from "@webiny/app/router.js";
import { usePermission } from "~/hooks/usePermission.js";
import { Routes } from "~/routes.js";

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
    <Suspense fallback={<OverlayLoader />}>{React.cloneElement(children, props)}</Suspense>
);

const MailerSettings = () => {
    const router = useRouter();
    const { canChangeSettings } = usePermission();

    const changeSettings = canChangeSettings();

    if (!changeSettings) {
        return null;
    }

    return (
        <AdminConfig>
            <HasPermission name={"mailer.settings"}>
                <Route
                    route={Routes.Settings}
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
                    element={<Menu.Link text={"Settings"} to={router.getLink(Routes.Settings)} />}
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
