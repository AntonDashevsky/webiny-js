import React, { useMemo } from "react";
import { cn, makeDecoratable, withStaticProps } from "~/utils";
import { SidebarMenuButton } from "./SidebarMenuButton";
import { SidebarMenuItemIcon } from "./SidebarMenuItemIcon";
import { SidebarMenuItemAction } from "./SidebarMenuItemAction";
import { SidebarMenuSub } from "./SidebarMenuSub";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@radix-ui/react-collapsible";
import { SidebarMenuSubItem } from "./SidebarMenuSubItem";
import { IconButton } from "~/Button";
import { ReactComponent as KeyboardArrowRightIcon } from "@material-design-icons/svg/outlined/keyboard_arrow_down.svg";
import { LinkProps, To } from "@webiny/react-router";

export interface SidebarMenuItemBaseProps {
    text: string;
    className?: string;
    children?: React.ReactNode;
    onClick?: React.MouseEventHandler;
    icon?: React.ReactNode;
    action?: React.ReactNode;
    variant?: "group-label";
    active?: boolean;
    disabled?: boolean;
}

export type SidebarMenuItemButtonProps = SidebarMenuItemBaseProps & { to?: never };
export type SidebarMenuItemLinkProps = SidebarMenuItemBaseProps & LinkProps & { to: To };

type SidebarMenuItemProps = SidebarMenuItemButtonProps | SidebarMenuItemLinkProps;

const SidebarMenuItemBase = ({ children, className, ...buttonProps }: SidebarMenuItemProps) => {
    const sidebarMenuButton = useMemo(() => {
        if (!children) {
            return <SidebarMenuButton {...buttonProps} />;
        }

        const chevron = (
            <CollapsibleTrigger asChild>
                <IconButton
                    variant={"ghost"}
                    size={"xs"}
                    className={
                        "wby-ml-auto wby-transition-transform wby-duration-200 group-data-[state=open]/menu-item-collapsible:wby-rotate-180 group-data-[state=collapsed]:wby-hidden"
                    }
                    color={"neutral-strong"}
                    data-sidebar={"menu-item-expanded-indicator"}
                    icon={<KeyboardArrowRightIcon />}
                />
            </CollapsibleTrigger>
        );

        return (
            <Collapsible className={cn("wby-w-full wby-group/menu-item-collapsible")}>
                <SidebarMenuButton {...buttonProps} action={chevron} />
                <CollapsibleContent
                    forceMount
                    className={"wby-hidden data-[state=open]:!wby-block"}
                >
                    <SidebarMenuSub>
                        {React.Children.map(children, child => {
                            if (React.isValidElement(child)) {
                                return <SidebarMenuSubItem {...child.props} />;
                            }
                            return child;
                        })}
                    </SidebarMenuSub>
                </CollapsibleContent>
            </Collapsible>
        );
    }, [children, buttonProps]);

    return (
        <li
            data-sidebar="menu-item"
            className={cn(
                "wby-group/menu-item wby-relative wby-px-xs-plus",

                // When the sidebar is collapsed, this ensures that the sidebar menu item is highlighted
                // if it contains an active child (no matter how deep in the hierarchy).
                "group-data-[state=collapsed]:[&:has([data-active=true])_[data-sidebar=menu-button]_svg]:!wby-fill-neutral-xstrong",
                "group-data-[state=collapsed]:[&:has([data-active=true])_[data-sidebar=menu-button]]:!wby-bg-neutral-dark/5",
                className
            )}
        >
            {sidebarMenuButton}
        </li>
    );
};

const DecoratableSidebarMenuItem = makeDecoratable("SidebarMenuItem", SidebarMenuItemBase);

const SidebarMenuItem = withStaticProps(DecoratableSidebarMenuItem, {
    Icon: SidebarMenuItemIcon,
    Action: SidebarMenuItemAction
});

export { SidebarMenuItem, type SidebarMenuItemProps };
