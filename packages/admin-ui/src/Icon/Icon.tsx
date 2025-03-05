import React from "react";
import * as AccessibleIcon from "@radix-ui/react-accessible-icon";
import { cn, cva, makeDecoratable, type VariantProps } from "~/utils";

const iconVariants = cva("wby-shrink-0", {
    variants: {
        size: {
            xs: "wby-size-sm-extra",
            sm: "wby-size-md",
            md: "wby-size-md-plus",
            lg: "wby-size-lg"
        },
        color: {
            inherit: "wby-fill-inherit",
            accent: "wby-fill-accent-default",
            neutral: "wby-fill-neutral-base",
            "neutral-light": "wby-fill-neutral-strong",
            "neutral-strong": "wby-fill-neutral-xstrong"
        }
    },
    defaultVariants: {
        size: "md",
        color: "inherit"
    }
});

interface IconProps
    extends Omit<React.HTMLAttributes<HTMLOrSVGElement>, "color">,
        VariantProps<typeof iconVariants> {
    label: string;
    icon: React.ReactNode;
}

const IconBase = (props: IconProps) => {
    const { label, icon, color, size, className, ...rest } = props;
    return (
        <AccessibleIcon.Root label={label}>
            {/* @ts-expect-error */}
            {React.cloneElement(icon, {
                ...rest,
                className: cn(iconVariants({ color, size }), className)
            })}
        </AccessibleIcon.Root>
    );
};

const Icon = makeDecoratable("Icon", IconBase);

export { Icon, type IconProps };
