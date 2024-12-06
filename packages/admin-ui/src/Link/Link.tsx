import React from "react";
import { makeDecoratable } from "@webiny/react-composition";
import { cva, type VariantProps } from "~/utils";

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
            secondary: "text-neutral-primary"
        },
        underline: {
            true: "link-underline"
        }
    },
    defaultVariants: {
        size: "md",
        variant: "primary",
        underline: true
    }
});

interface LinkProps
    extends React.HTMLAttributes<HTMLAnchorElement>,
        VariantProps<typeof linkVariants> {
    link: React.ReactNode;
}

const LinkBase = React.forwardRef<any, LinkProps>(
    ({ size, variant, underline, className, children, ...rest }, ref) => {
        return (
            <a
                {...rest}
                className={linkVariants({ size, variant, underline, className })}
                ref={ref}
            >
                {children}
            </a>
        );
    }
);

LinkBase.displayName = "Link";

const Link = makeDecoratable("link", LinkBase);

export { Link, type LinkProps };
