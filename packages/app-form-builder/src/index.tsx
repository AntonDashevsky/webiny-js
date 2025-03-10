import React, { lazy, Suspense } from "react";
import { AddRoute, AdminConfig, Layout, Plugin } from "@webiny/app-admin";
import { HasPermission } from "@webiny/app-security";
import { CircularProgress } from "@webiny/ui/Progress";
import FormsSettings from "./admin/views/Settings/FormsSettings";
import { ReactComponent as FormsIcon } from "@material-design-icons/svg/outlined/check_box.svg";

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
                <AddRoute exact path={"/form-builder/forms/:id"}>
                    <Loader label={"Loading editor..."}>
                        <FormEditor />
                    </Loader>
                </AddRoute>
                <AddRoute exact path={"/form-builder/forms"}>
                    <Layout title={"Form Builder - Forms"}>
                        <Loader label={"Loading view..."}>
                            <Forms />
                        </Loader>
                    </Layout>
                </AddRoute>
            </HasPermission>
            <HasPermission name={"fb.settings"}>
                <AddRoute path="/settings/form-builder/recaptcha">
                    <Layout title={"Form Builder - reCAPTCHA Settings"}>
                        <FormsSettings />
                    </Layout>
                </AddRoute>

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
            </HasPermission>
        </Plugin>
    );
};

export * from "./plugins";
