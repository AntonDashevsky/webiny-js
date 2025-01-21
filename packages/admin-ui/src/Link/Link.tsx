import React from "react";
import { makeDecoratable } from "@webiny/react-composition";
import { cva, type VariantProps } from "~/utils";
import {
    Link as WebinyReactRouterLink,
    type LinkProps as WebinyReactRouterLinkProps
} from "@webiny/react-router";

const linkVariants = cva("wby-font-sans wby-rounded-xs", {
    variants: {
        size: {
            inherit: "[font-size:inherit]",
            sm: "wby-text-sm",
            md: "wby-text-md",
            lg: "wby-text-lg",
            xl: "wby-text-xl"
        },
        variant: {
            primary: [
                "wby-text-accent-primary",
                "wby-focus-visible:wby-outline-none wby-focus-visible:wby-ring-[2px] wby-focus-visible:wby-ring-primary-dimmed"
            ],
            secondary: [
                "wby-text-neutral-primary",
                "wby-focus-visible:wby-outline-none wby-focus-visible:wby-ring-[2px] wby-focus-visible:wby-ring-primary-dimmed"
            ],
            "primary-negative": [
                "wby-text-accent-primary",
                "wby-focus-visible:wby-outline-none wby-focus-visible:wby-ring-[2px] wby-focus-visible:wby-ring-primary-strong"
            ],
            "secondary-negative": [
                "wby-text-neutral-light",
                "wby-focus-visible:wby-outline-none wby-focus-visible:wby-ring-[2px] wby-focus-visible:wby-ring-primary-strong"
            ]
        },
        underline: {
            true: "wby-underline wby-hover:wby-no-underline",
            false: "wby-hover:wby-underline"
        }
    },
    defaultVariants: {
        size: "inherit",
        variant: "primary",
        underline: false
    }
});

interface LinkProps extends WebinyReactRouterLinkProps, VariantProps<typeof linkVariants> {
    disabled?: boolean;
}

const LinkBase = ({ size, variant, underline, className, children, ...rest }: LinkProps) => {
    return (
        <WebinyReactRouterLink
            {...rest}
            className={linkVariants({ size, variant, underline, className })}
        >
            {children}
        </WebinyReactRouterLink>
    );
};

LinkBase.displayName = "Link";

const Link = makeDecoratable("link", LinkBase);

export { Link, type LinkProps };
