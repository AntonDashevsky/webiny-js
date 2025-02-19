import { cva, VariantProps } from "class-variance-authority";
import React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cn } from "~/utils";

const sidebarMenuButtonVariants = cva(
    "wby-peer/menu-button wby-flex wby-w-full wby-items-center wby-gap-sm wby-overflow-hidden wby-rounded-md wby-text-neutral-primary wby-px-sm wby-py-xs-plus wby-text-left wby-text-md wby-outline-none wby-ring-sidebar-ring wby-transition-[width,height,padding] hover:wby-bg-sidebar-accent hover:wby-text-sidebar-accent-foreground focus-visible:wby-ring-2 active:wby-bg-sidebar-accent active:wby-text-sidebar-accent-foreground disabled:wby-pointer-events-none disabled:wby-opacity-50 group--has-[[data-sidebar=menu-action]]/menu-item:wby-pr-8 aria-disabled:wby-pointer-events-none aria-disabled:wby-opacity-50 data-[active=true]:wby-bg-sidebar-accent data-[active=true]:wby-font-medium data-[active=true]:wby-text-sidebar-accent-foreground data-[state=open]:hover:wby-bg-sidebar-accent data-[state=open]:hover:wby-text-sidebar-accent-foreground group--data-[collapsible=icon]:!wby-size-8 group--data-[collapsible=icon]:!wby-p-2 [&>span:last-child]:wby-truncate [&>svg]:wby-size-4 [&>svg]:wby-shrink-0",
    {
        variants: {
            variant: {
                default: "hover:wby-bg-sidebar-accent hover:wby-text-sidebar-accent-foreground",
                outline:
                    "wby-bg-background wby-shadow-[0_0_0_1px_hsl(var(--sidebar-border))] hover:wby-bg-sidebar-accent hover:wby-text-sidebar-accent-foreground hover:wby-shadow-[0_0_0_1px_hsl(var(--sidebar-accent))]"
            },
            size: {
                default: "wby-h-8 text-sm",
                sm: "wby-h-7 text-xs",
                lg: "wby-h-12 text-sm group-data-[collapsible=icon]:!p-0"
            }
        },
        defaultVariants: {
            variant: "default",
            size: "default"
        }
    }
);

type SidebarMenuButtonProps = React.ComponentProps<"button"> & {
    asChild?: boolean;
    isActive?: boolean;
    icon?: React.ReactNode;
} & VariantProps<typeof sidebarMenuButtonVariants>;

const SidebarMenuButton = ({
    asChild = false,
    isActive = false,
    icon,
    children,
    variant = "default",
    size = "default",
    // tooltip,
    className,
    ...props
}: SidebarMenuButtonProps) => {
    const Comp = asChild ? Slot : "button";

    return (
        <Comp
            data-sidebar="menu-button"
            data-size={size}
            data-active={isActive}
            className={cn(sidebarMenuButtonVariants({ variant, size }), className)}
            {...props}
        >
            {icon} {children}
        </Comp>
    );
};

export { SidebarMenuButton };
