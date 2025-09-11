import React from "react";
import type { ButtonProps } from "./Button.js";
import { useMappedButtonProps } from "~/Button/useMappedButtonProps.js";
import { Button as AdminUiButton } from "@webiny/admin-ui";

/**
 * @deprecated This component is deprecated and will be removed in future releases.
 * Please use the `Button` component from the `@webiny/admin-ui` package instead.
 */
export const ButtonPrimary = function ButtonPrimary(props: ButtonProps) {
    const mappedProps = useMappedButtonProps(props);
    return <AdminUiButton {...mappedProps} variant={"primary"} />;
};
