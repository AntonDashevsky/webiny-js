import React, { lazy, Suspense } from "react";
import { Layout, Plugin } from "@webiny/app-admin";
import { HasPermission } from "@webiny/app-security";
import { CircularProgress } from "@webiny/ui/Progress";
import FormsSettings from "./admin/views/Settings/FormsSettings";
import { ReactComponent as FormsIcon } from "@material-design-icons/svg/outlined/check_box.svg";
import { AdminConfig } from "@webiny/app-admin";
import { RouterConfig } from "@webiny/app/config/RouterConfig";

const { Route } = RouterConfig;
const { Menu } = AdminConfig;

const FormEditor = lazy(
    () =>
        import(
            /* webpackChunkName: "FormBuilderAdminViewsEditor" */
            "./admin/views/Editor"
        )
);
const Forms = lazy(
    () =>
        import(
            /* webpackChunkName: "FormBuilderAdminViewsForms" */
            "./admin/views/Forms/Forms"
        )
);

interface LoaderProps {
    label: string;
    children: React.ReactNode;
}

const Loader = ({ children, label, ...props }: LoaderProps) => (
    <Suspense fallback={<CircularProgress label={label} />}>
        {React.cloneElement(children as unknown as React.ReactElement, props)}
    </Suspense>
);

export const FormBuilder = () => {
    return (
        <Plugin>
            <HasPermission name={"fb.form"}>
                <AdminConfig>
                    <Menu
                        name="fb"
                        element={
                            <Menu.Item
                                label={"Form Builder"}
                                icon={<FormsIcon />}
                                path={"/form-builder/forms"}
                            />
                        }
                    />
                </AdminConfig>
                <RouterConfig>
                    <Route
                        name={"fb.forms"}
                        exact
                        path={"/form-builder/forms/:id"}
                        element={
                            <Loader label={"Loading editor..."}>
                                <FormEditor />
                            </Loader>
                        }
                    />
                    <Route
                        name={"fb.forms"}
                        exact
                        path={"/form-builder/forms"}
                        element={
                            <Layout title={"Form Builder - Forms"}>
                                <Loader label={"Loading view..."}>
                                    <Forms />
                                </Loader>
                            </Layout>
                        }
                    />
                </RouterConfig>
            </HasPermission>
            <HasPermission name={"fb.settings"}>
                <RouterConfig>
                    <Route
                        name={"fb.settings.recaptcha"}
                        path="/settings/form-builder/recaptcha"
                        element={
                            <Layout title={"Form Builder - reCAPTCHA Settings"}>
                                <FormsSettings />
                            </Layout>
                        }
                    />
                </RouterConfig>

                <AdminConfig>
                    <Menu
                        name="fb.settings"
                        parent={"settings"}
                        element={<Menu.Item label={"Form Builder"} />}
                    />
                    <Menu
                        name="fb.settings.recaptcha"
                        parent={"settings"}
                        element={
                            <Menu.Item
                                label={"reCAPTCHA"}
                                path={"/settings/form-builder/recaptcha"}
                            />
                        }
                    />
                </AdminConfig>
            </HasPermission>
        </Plugin>
    );
};

export * from "./plugins";
