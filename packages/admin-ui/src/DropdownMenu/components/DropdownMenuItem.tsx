import * as React from "react";
import * as DropdownMenuPrimitive from "@radix-ui/react-dropdown-menu";
import { cn, cva, makeDecoratable } from "~/utils";
import { DropdownMenuSubRoot } from "./DropdownMenuSubRoot";
import { DropdownMenuSubTrigger } from "./DropdownMenuSubTrigger";
import { DropdownMenuPortal } from "./DropdownMenuPortal";
import { DropdownMenuSubContent } from "./DropdownMenuSubContent";
import { DropdownMenuItemIcon } from "./DropdownMenuItemIcon";

interface DropdownMenuItemProps
    extends React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Item> {
    icon?: React.ReactNode;
    readOnly?: boolean;
    text?: React.ReactNode;
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

const DropdownMenuItemBase = React.forwardRef<
    React.ElementRef<typeof DropdownMenuPrimitive.Item>,
    DropdownMenuItemProps
>(({ className, icon, text, readOnly, children, ...props }, ref) => {
    if (children) {
        return (
            <DropdownMenuSubRoot>
                <DropdownMenuSubTrigger>
                    {icon}
                    <span>{text}</span>
                </DropdownMenuSubTrigger>
                <DropdownMenuPortal>
                    <DropdownMenuSubContent>{children}</DropdownMenuSubContent>
                </DropdownMenuPortal>
            </DropdownMenuSubRoot>
        );
    }

    return (
        <DropdownMenuPrimitive.Item
            ref={ref}
            className={cn(variants({ readOnly }), className)}
            {...props}
        >
            <div
                className={cn(
                    "wby-flex wby-px-sm wby-py-xs-plus wby-gap-sm-extra wby-items-center wby-text-md wby-rounded-sm wby-transition-colors",
                    {
                        "[&_svg]:wby-fill-neutral-disabled": props.disabled
                    }
                )}
            >
                {icon}
                <span>{text}</span>
            </div>
        </DropdownMenuPrimitive.Item>
    );
});

DropdownMenuItemBase.displayName = DropdownMenuPrimitive.Item.displayName;

const DecoratableDropdownMenuItem = makeDecoratable("DropdownMenuItem", DropdownMenuItemBase);

const DropdownMenuItem = Object.assign(DecoratableDropdownMenuItem, {
    Icon: DropdownMenuItemIcon
});

export { DropdownMenuItem, type DropdownMenuItemProps };
