import React from "react";
import * as DropdownMenuPrimitive from "@radix-ui/react-dropdown-menu";
import { cn, makeDecoratable } from "~/utils";
import { ReactComponent as Check } from "@material-design-icons/svg/outlined/check.svg";

export interface DropdownMenuItemProps
    extends Omit<
        React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.CheckboxItem>,
        "content"
    > {
    content?: React.ReactNode;
}

const DropdownMenuCheckboxItemBase = React.forwardRef<
    React.ElementRef<typeof DropdownMenuPrimitive.CheckboxItem>,
    DropdownMenuItemProps
>(({ className, content, checked, ...props }, ref) => (
    <DropdownMenuPrimitive.CheckboxItem
        ref={ref}
        className={cn(
            "relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
            className
        )}
        checked={checked}
        {...props}
    >
        <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
            <DropdownMenuPrimitive.ItemIndicator>
                <Check className="h-4 w-4" />
            </DropdownMenuPrimitive.ItemIndicator>
        </span>
        {content}
    </DropdownMenuPrimitive.CheckboxItem>
));

DropdownMenuCheckboxItemBase.displayName = DropdownMenuPrimitive.CheckboxItem.displayName;

export const DropdownMenuCheckboxItem = makeDecoratable(
    "DropdownMenuCheckboxItem",
    DropdownMenuCheckboxItemBase
);
