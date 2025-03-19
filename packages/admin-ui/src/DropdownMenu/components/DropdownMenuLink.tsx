import * as React from "react";
import * as DropdownMenuPrimitive from "@radix-ui/react-dropdown-menu";
import { cn, cva, makeDecoratable } from "~/utils";
import { DropdownMenuSubRoot } from "~/DropdownMenu/components/DropdownMenuSubRoot";
import { DropdownMenuSubTrigger } from "~/DropdownMenu/components/DropdownMenuSubTrigger";
import { DropdownMenuPortal } from "~/DropdownMenu/components/DropdownMenuPortal";
import { DropdownMenuSubContent } from "~/DropdownMenu/components/DropdownMenuSubContent";
import { Link, LinkProps } from "@webiny/react-router";

interface DropdownMenuLinkProps extends Omit<LinkProps, "content"> {
    icon?: React.ReactNode;
    readOnly?: boolean;
    disabled?: boolean;
    content?: React.ReactNode;
}

const variants = cva(
    [
        "wby-group wby-relative wby-cursor-default wby-select-none wby-items-center wby-rounded-sm",
        "wby-text-md wby-text-neutral-primary !wby-no-underline",
        "wby-px-xs-plus wby-outline-none wby-transition-colors",
        "[&_svg]:wby-fill-neutral-xstrong [&_svg]:wby-pointer-events-none [&_svg]:wby-size-md [&_svg]:wby-shrink-0",
        "data-[disabled]:wby-pointer-events-none data-[disabled]:wby-text-neutral-disabled",
        "focus:wby-bg-neutral-dimmed",
        "[&_a]:!wby-no-underline [&_a]:!wby-text-neutral-primary"
    ],
    {
        variants: {
            readOnly: {
                true: "wby-pointer-events-none"
            }
        },
        defaultVariants: {
            readOnly: false
        }
    }
);

const DropdownMenuLinkBase = React.forwardRef<
    React.ElementRef<typeof DropdownMenuPrimitive.Item>,
    DropdownMenuLinkProps
>(({ className, icon, content, readOnly, children, ...linkProps }, ref) => {
    if (children) {
        return (
            <DropdownMenuSubRoot>
                <DropdownMenuSubTrigger>
                    {/* We don't allow sub menu opener items to be links. */}
                    {icon}
                    <span>{content}</span>
                </DropdownMenuSubTrigger>
                <DropdownMenuPortal>
                    <DropdownMenuSubContent>{children}</DropdownMenuSubContent>
                </DropdownMenuPortal>
            </DropdownMenuSubRoot>
        );
    }

    return (
        <DropdownMenuPrimitive.Item ref={ref} className={cn(variants({ readOnly }), className)}>
            <Link
                {...linkProps}
                className={cn(
                    "wby-flex wby-px-sm wby-py-xs-plus wby-gap-sm-extra wby-items-center wby-text-md wby-rounded-sm wby-transition-colors",
                    {
                        "[&_svg]:wby-fill-neutral-disabled": linkProps.disabled
                    }
                )}
            >
                {icon}
                <span>{content}</span>
            </Link>
        </DropdownMenuPrimitive.Item>
    );
});

DropdownMenuLinkBase.displayName = DropdownMenuPrimitive.Item.displayName;

const DropdownMenuLink = makeDecoratable("DropdownMenuLink", DropdownMenuLinkBase);

export { DropdownMenuLink, type DropdownMenuLinkProps };
