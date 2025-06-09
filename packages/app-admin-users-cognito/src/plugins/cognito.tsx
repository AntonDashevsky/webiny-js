import React, { Fragment } from "react";
import { Cell } from "@webiny/ui/Grid/index.js";
import { Input } from "@webiny/ui/Input/index.js";
import { validation } from "@webiny/validation";
import { type PluginCollection } from "@webiny/plugins/types.js";
import { ViewPlugin } from "@webiny/app/plugins/ViewPlugin.js";
import { UIViewPlugin } from "@webiny/app-admin/ui/UIView.js";
import { UsersFormView } from "~/ui/views/Users/UsersFormView.js";
import { PasswordElement } from "@webiny/app-admin/ui/elements/form/PasswordElement.js";
import { createPasswordValidator, type PasswordPolicy } from "~/createPasswordValidator.js";
import { config as appConfig } from "@webiny/app/config.js";

export default (): PluginCollection => {
    let envPasswordValidatorPolicy;
    try {
        envPasswordValidatorPolicy = JSON.parse(
            process.env.REACT_APP_USER_POOL_PASSWORD_POLICY as string
        );
    } catch {
        // Do nothing.
    }

    const passwordValidatorPolicy = appConfig.getKey<PasswordPolicy>(
        "USER_POOL_PASSWORD_POLICY",
        envPasswordValidatorPolicy
    );

    const passwordValidator = createPasswordValidator(passwordValidatorPolicy);
    return [
        // Add password input to admin user installation
        new ViewPlugin({
            name: "adminUsers.installation.fields",
            render({ children, Bind }) {
                return (
                    <Fragment>
                        {children}
                        <Cell span={12}>
                            <Bind
                                name="password"
                                validators={[passwordValidator, validation.create("required")]}
                            >
                                <Input autoComplete="off" type="password" label={"Password"} />
                            </Bind>
                        </Cell>
                    </Fragment>
                );
            }
        }),

        // Add password input to admin user form
        new ViewPlugin({
            name: "adminUsers.account.form.fields",
            render({ children, Bind, data }) {
                return (
                    <Fragment>
                        {children}
                        <Cell span={12}>
                            <Bind name="password" validators={passwordValidator}>
                                <Input
                                    autoComplete="off"
                                    disabled={data.external}
                                    description={data.id && "Type a new password to reset it."}
                                    type="password"
                                    label={"Password"}
                                    data-testid="account.password"
                                />
                            </Bind>
                        </Cell>
                    </Fragment>
                );
            }
        }),

        // Add password input to admin user form
        new UIViewPlugin<UsersFormView>(UsersFormView, view => {
            const bioSection = view.getElement("bio");
            if (!bioSection) {
                return;
            }

            const useFormHook = () => view.getUserFormHook();

            bioSection.addElement(
                new PasswordElement("password", {
                    name: "password",
                    label: "Password",
                    description: () => {
                        const { isNewUser } = useFormHook();
                        if (!isNewUser) {
                            return "Type a new password to reset it.";
                        }
                        return "";
                    },
                    validators: () => {
                        const { isNewUser } = useFormHook();
                        if (isNewUser) {
                            return [passwordValidator, validation.create("required")];
                        }
                        return passwordValidator;
                    }
                })
            );
        })
    ];
};
