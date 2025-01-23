import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { Icon as BaseIcon } from "~/Icon";
import { cn } from "~/utils";

/**
 * Icon
 */
const inputIconVariants = cva("wby-absolute wby-fill-neutral-xstrong", {
    variants: {
        // Define dummy variants to be used in combination with `compoundVariants` below.
        inputSize: {
            md: "wby-top-sm",
            lg: "wby-top-sm-extra",
            xl: "wby-top-md"
        },
        position: {
            start: "",
            end: ""
        },
        disabled: {
            true: "wby-fill-neutral-disabled"
        }
    },
    defaultVariants: {
        inputSize: "md",
        position: "start"
    },
    compoundVariants: [
        // The icon position is `absolute` and is adjusted horizontally across its parent using left and right.
        {
            inputSize: "md",
            position: "start",
            class: "wby-left-[calc(theme(spacing.sm-plus)-theme(borderWidth.sm))]"
        },
        {
            inputSize: "md",
            position: "end",
            class: "wby-right-[calc(theme(spacing.sm-plus)-theme(borderWidth.sm))]"
        },
        {
            inputSize: "lg",
            position: "start",
            class: "wby-left-[calc(theme(spacing.sm-plus)-theme(borderWidth.sm))]"
        },
        {
            inputSize: "lg",
            position: "end",
            class: "wby-right-[calc(theme(spacing.sm-plus)-theme(borderWidth.sm))]"
        },
        {
            inputSize: "xl",
            position: "start",
            class: "wby-left-[calc(theme(spacing.md)-theme(borderWidth.sm))]"
        },
        {
            inputSize: "xl",
            position: "end",
            class: "wby-right-[calc(theme(spacing.md)-theme(borderWidth.sm))]"
        }
    ]
});

interface InputIconProps
    extends React.HTMLAttributes<HTMLDivElement>,
        VariantProps<typeof inputIconVariants> {
    icon: React.ReactElement;
}

const InputIcon = ({ icon, disabled, position, inputSize, className }: InputIconProps) => {
    return (
        <div className={cn(inputIconVariants({ position, disabled, inputSize }), className)}>
            {React.cloneElement(icon, {
                ...icon.props,
                size: inputSize === "xl" ? "lg" : "sm" // Map icon size based on the input size.
            })}
        </div>
    );
};

/**
 * Input
 *
 * We support both `disabled` and `data-disabled` as well as `focused` and `data-focused` variants
 * because these variants can be used by both input and div elements. The last one is used by `MultiAutocomplete` component,
 * where the `inputVariants` is used to style a div that wraps multiple elements (input, Tags, icons, etc.)
 */
const inputVariants = cva(
    [
        "wby-w-full wby-border-sm wby-text-md wby-peer",
        "focus-visible:wby-outline-none",
        "disabled:wby-cursor-not-allowed data-[disabled=true]:wby-cursor-not-allowed",
        "file:wby-bg-transparent file:wby-border-none file:wby-text-sm file:wby-font-semibold"
    ],
    {
        variants: {
            size: {
                md: [
                    "wby-rounded-md",
                    "wby-py-[calc(theme(padding.xs-plus)-theme(borderWidth.sm))] wby-px-[calc(theme(padding.sm-extra)-theme(borderWidth.sm))]"
                ],
                lg: [
                    "wby-rounded-md",
                    "wby-py-[calc(theme(padding.sm-plus)-theme(borderWidth.sm))] wby-px-[calc(theme(padding.sm-extra)-theme(borderWidth.sm))]"
                ],
                xl: [
                    "wby-rounded-lg wby-leading-6",
                    "wby-py-[calc(theme(padding.md)-theme(borderWidth.sm))] wby-px-[calc(theme(padding.md)-theme(borderWidth.sm))]"
                ]
            },
            variant: {
                primary: [
                    "wby-bg-neutral-base wby-border-neutral-muted wby-text-neutral-strong placeholder:wby-text-neutral-dimmed",
                    "hover:wby-border-neutral-strong",
                    "focus:wby-border-neutral-black",
                    "data-[focused=true]:wby-border-neutral-black",
                    "disabled:wby-bg-neutral-disabled disabled:wby-border-neutral-dimmed disabled:wby-text-neutral-disabled disabled:placeholder:wby-text-neutral-disabled",
                    "data-[disabled=true]:wby-bg-neutral-disabled data-[disabled=true]:wby-border-neutral-dimmed data-[disabled=true]:wby-text-neutral-disabled data-[disabled=true]:placeholder:wby-text-neutral-disabled"
                ],
                secondary: [
                    "wby-bg-neutral-light wby-border-neutral-subtle wby-text-neutral-strong placeholder:wby-text-neutral-dimmed",
                    "hover:wby-bg-neutral-dimmed",
                    "focus:wby-bg-neutral-base focus:wby-border-neutral-black",
                    "data-[focused=true]:wby-bg-neutral-base data-[focused=true]:wby-border-neutral-black",
                    "disabled:wby-bg-neutral-disabled disabled:wby-text-neutral-disabled disabled:placeholder:wby-text-neutral-disabled",
                    "data-[disabled=true]:wby-bg-neutral-disabled data-[disabled=true]:wby-text-neutral-disabled data-[disabled=true]:placeholder:wby-text-neutral-disabled"
                ],
                ghost: [
                    "wby-bg-transparent wby-border-transparent wby-text-neutral-strong placeholder:wby-text-neutral-dimmed",
                    "hover:wby-bg-neutral-dimmed/95",
                    "focus:wby-bg-neutral-base focus:wby-border-neutral-black",
                    "data-[focused=true]:wby-bg-neutral-base data-[focused=true]:wby-border-neutral-black",
                    "disabled:wby-bg-transparent disabled:wby-text-neutral-disabled disabled:placeholder:wby-text-neutral-disabled",
                    "data-[disabled=true]:wby-bg-transparent data-[disabled=true]:wby-text-neutral-disabled data-[disabled=true]:placeholder:wby-text-neutral-disabled"
                ]
            },
            iconPosition: {
                start: "wby-pl-[calc(theme(padding.xl)-theme(borderWidth.sm))]",
                end: "wby-pr-[calc(theme(padding.xl)-theme(borderWidth.sm))]",
                both: [
                    "wby-pl-[calc(theme(padding.xl)-theme(borderWidth.sm))]",
                    "wby-pr-[calc(theme(padding.xl)-theme(borderWidth.sm))]"
                ]
            },
            invalid: {
                true: ""
            }
        },
        compoundVariants: [
            // Prevent text overlap with icons, add extra padding for icons.
            {
                size: "lg",
                iconPosition: "start",
                class: "wby-pl-[calc(theme(padding.xl)-theme(borderWidth.sm))]"
            },
            {
                size: "lg",
                iconPosition: "end",
                class: "wby-pr-[calc(theme(padding.xl)-theme(borderWidth.sm))]"
            },
            {
                size: "lg",
                iconPosition: "both",
                class: [
                    "wby-pl-[calc(theme(padding.xl)-theme(borderWidth.sm))]",
                    "wby-pr-[calc(theme(padding.xl)-theme(borderWidth.sm))]"
                ]
            },
            {
                size: "xl",
                iconPosition: "start",
                class: "wby-pl-[calc(theme(padding.xxl)+theme(padding.xs)-theme(borderWidth.sm))]"
            },
            {
                size: "xl",
                iconPosition: "end",
                class: "wby-pr-[calc(theme(padding.xxl)+theme(padding.xs)-theme(borderWidth.sm))]"
            },
            {
                size: "xl",
                iconPosition: "both",
                class: [
                    "wby-pl-[calc(theme(padding.xxl)+theme(padding.xs)-theme(borderWidth.sm))]",
                    "wby-pr-[calc(theme(padding.xxl)+theme(padding.xs)-theme(borderWidth.sm))]"
                ]
            },
            // Add specific classNames in case of invalid inputs: note the difference between the ghost and the other variants.
            {
                variant: "primary",
                invalid: true,
                class: "!wby-border-destructive-default"
            },
            {
                variant: "secondary",
                invalid: true,
                class: "!wby-border-destructive-default"
            },
            {
                variant: "ghost",
                invalid: true,
                class: "!wby-border-destructive-subtle !wby-bg-destructive-subtle"
            }
        ],
        defaultVariants: {
            size: "md",
            variant: "primary"
        }
    }
);

interface InputPrimitiveProps
    extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size">,
        VariantProps<typeof inputVariants> {
    startIcon?: React.ReactElement<typeof BaseIcon> | React.ReactElement;
    endIcon?: React.ReactElement<typeof BaseIcon> | React.ReactElement;
    maxLength?: React.InputHTMLAttributes<HTMLInputElement>["size"];
    inputRef?: React.Ref<HTMLInputElement>;
}

const getIconPosition = (
    startIcon?: InputPrimitiveProps["startIcon"],
    endIcon?: InputPrimitiveProps["endIcon"]
): "start" | "end" | "both" | undefined => {
    if (startIcon && endIcon) {
        return "both";
    }
    if (startIcon) {
        return "start";
    }
    if (endIcon) {
        return "end";
    }
    return;
};

const InputPrimitive = ({
    className,
    disabled,
    invalid,
    startIcon,
    maxLength,
    size,
    endIcon,
    variant,
    inputRef,
    ...props
}: InputPrimitiveProps) => {
    const iconPosition = getIconPosition(startIcon, endIcon);

    return (
        <div className={cn("wby-relative wby-flex wby-items-center wby-w-full", className)}>
            {startIcon && (
                <InputIcon
                    disabled={disabled}
                    icon={startIcon}
                    inputSize={size}
                    position={"start"}
                />
            )}
            <input
                ref={inputRef}
                className={cn(inputVariants({ variant, size, iconPosition, invalid }))}
                disabled={disabled}
                size={maxLength}
                {...props}
            />
            {endIcon && (
                <InputIcon disabled={disabled} icon={endIcon} inputSize={size} position={"end"} />
            )}
        </div>
    );
};

export {
    InputIcon,
    InputPrimitive,
    getIconPosition,
    inputVariants,
    type InputIconProps,
    type InputPrimitiveProps
};
