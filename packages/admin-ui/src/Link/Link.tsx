import React from "react";
import { makeDecoratable } from "@webiny/react-composition";
import { cva, type VariantProps } from "~/utils";
import {
    Link as WebinyReactRouterLink,
    type LinkProps as WebinyReactRouterLinkProps
} from "@webiny/react-router";

const linkVariants = cva("font-sans", {
    variants: {
        size: {
            sm: "text-sm",
            md: "text-md",
            lg: "text-lg",
            xl: "text-xl"
        },
        variant: {
            primary: "text-accent-primary",
            secondary: "text-neutral-primary",
            "primary-negative": "text-accent-primary",
            "secondary-negative": "text-neutral-light"
        },
        underline: {
            true: "underline hover:no-underline",
            false: "hover:underline"
        },
        disabled: {
            true: "pointer-events-none"
        }
    },
    compoundVariants: [
        {
            variant: "primary",
            disabled: true,
            className: "text-neutral-disabled"
        },
        {
            variant: "secondary",
            disabled: true,
            className: "text-neutral-disabled"
        },
        {
            variant: "primary-negative",
            disabled: true,
            className: "!text-neutral-disabled-negative/50"
        },
        {
            variant: "secondary-negative",
            disabled: true,
            className: "!text-neutral-disabled-negative/50"
        }
    ],
    defaultVariants: {
        size: "md",
        variant: "primary",
        underline: false
    }
});

interface LinkProps extends WebinyReactRouterLinkProps, VariantProps<typeof linkVariants> {
    disabled?: boolean;
}

const LinkBase = ({
    size,
    variant,
    underline,
    className,
    disabled,
    children,
    ...rest
}: LinkProps) => {
    return (
        <WebinyReactRouterLink
            {...rest}
            className={linkVariants({ size, variant, underline, disabled, className })}
        >
            {children}
        </WebinyReactRouterLink>
    );
};

LinkBase.displayName = "Link";

const Link = makeDecoratable("link", LinkBase);

export { Link, type LinkProps };
