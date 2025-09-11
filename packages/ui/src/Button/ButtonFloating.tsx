import React from "react";
import type { IconButtonProps } from "./IconButton.js";
import { IconButton } from "./IconButton.js";

/**
 * @deprecated This component is deprecated and will be removed in future releases.
 * Please use the `Button` component from the `@webiny/admin-ui` package instead.
 */
export const ButtonFloating = (props: IconButtonProps) => {
    return <IconButton {...props} />;
};
