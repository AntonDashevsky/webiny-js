import React from "react";
import type { IconButtonProps } from "./IconButton";
import { IconButton } from "./IconButton";

/**
 * @deprecated This component is deprecated and will be removed in future releases.
 * Please use the `Button` component from the `@webiny/admin-ui` package instead.
 */
export const ButtonFloating = (props: IconButtonProps) => {
    return <IconButton {...props} />;
};
