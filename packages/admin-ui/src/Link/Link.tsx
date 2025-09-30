import React from "react";
import { cva, type VariantProps, makeDecoratable, cn } from "~/utils.js";
import { SimpleLink, type SimpleLinkProps } from "@webiny/app/router.js";

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
                "focus-visible:wby-outline-none focus-visible:wby-ring-[2px] focus-visible:wby-ring-primary-dimmed"
            ],
            secondary: [
                "wby-text-neutral-primary",
                "focus-visible:wby-outline-none focus-visible:wby-ring-[2px] focus-visible:wby-ring-primary-dimmed"
            ],
            "primary-negative": [
                "wby-text-accent-primary",
                "focus-visible:wby-outline-none focus-visible:wby-ring-[2px] focus-visible:wby-ring-primary-strong"
            ],
            "secondary-negative": [
                "wby-text-neutral-light",
                "focus-visible:wby-outline-none focus-visible:wby-ring-[2px] focus-visible:wby-ring-primary-strong"
            ]
        },
        underline: {
            true: "wby-underline hover:wby-no-underline",
            false: "hover:wby-underline"
        }
    },
    defaultVariants: {
        size: "inherit",
        variant: "primary",
        underline: false
    }
});

export type LinkProps = SimpleLinkProps &
    VariantProps<typeof linkVariants> & {
        disabled?: boolean;
    };

function LinkBase({ size, variant, underline, className, children, ...rest }: LinkProps) {
    return (
        <SimpleLink {...rest} className={cn(linkVariants({ size, variant, underline }), className)}>
            {children}
        </SimpleLink>
    );
}

export const Link = makeDecoratable("Link", LinkBase);
