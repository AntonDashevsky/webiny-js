import { useMemo } from "react";
import omit from "lodash/omit.js";
import type { ButtonProps as AdminUiButtonProps } from "@webiny/admin-ui";
import type { ButtonProps } from "~/Button/Button.js";

export const useMappedButtonProps = (props: ButtonProps) => {
    return useMemo(() => {
        const mappedButtonProps: Pick<AdminUiButtonProps, "size" | "text"> = {};

        if (props.small === true) {
            mappedButtonProps.size = "sm";
        }

        if (props.children) {
            mappedButtonProps.text = props.children;
        }

        // Return all remaining props omitting unused ones.
        return {
            ...omit(props, ["flat", "ripple", "small"]),
            ...mappedButtonProps
        };
    }, [props]);
};
