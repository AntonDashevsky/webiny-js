import React from "react";
import { Text, type TextProps } from "~/Text";
import { cn, cva, makeDecoratable, type VariantProps } from "~/utils";

const formComponentErrorMessageVariants = cva(
    "wby-mt-xs wby-text-destructive-primary wby-font-semibold",
    {
        variants: {
            disabled: {
                true: "wby-text-destructive-muted"
            }
        }
    }
);

type FormComponentErrorMessageProps = TextProps &
    VariantProps<typeof formComponentErrorMessageVariants> & {
        text?: React.ReactNode;
        invalid?: boolean;
    };

const DecoratableFormComponentErrorMessage = ({
    invalid,
    disabled,
    className,
    text,
    ...props
}: FormComponentErrorMessageProps) => {
    if (!invalid || !text) {
        return null;
    }

    return (
        <Text
            {...props}
            size={"sm"}
            as={"div"}
            className={cn(formComponentErrorMessageVariants({ disabled }), className)}
        >
            {text}
        </Text>
    );
};

const FormComponentErrorMessage = makeDecoratable(
    "FormComponentErrorMessage",
    DecoratableFormComponentErrorMessage
);

export { FormComponentErrorMessage, type FormComponentErrorMessageProps };
