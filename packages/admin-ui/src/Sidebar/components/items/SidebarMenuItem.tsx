import React from "react";
import { makeDecoratable, withStaticProps } from "~/utils";
import { SidebarMenuItemIcon } from "./SidebarMenuItemIcon";
import { SidebarMenuItemAction } from "./SidebarMenuItemAction";
import { SidebarMenuSubItem } from "./SidebarMenuSubItem";
import { useSidebarMenu } from "./SidebarMenuProvider";
import { LinkProps, To } from "@webiny/react-router";
import { SidebarMenuRootItem } from "~/Sidebar/components/items/SidebarMenuRootItem";

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

const SidebarMenuItemBase = (props: SidebarMenuItemProps) => {
    const { currentLevel } = useSidebarMenu();

    if (currentLevel === 0) {
        return <SidebarMenuRootItem {...props} />;
    }

    return <SidebarMenuSubItem {...props} />;
};

const DecoratableSidebarMenuItem = makeDecoratable("SidebarMenuItem", SidebarMenuItemBase);

const SidebarMenuItem = withStaticProps(DecoratableSidebarMenuItem, {
    Icon: SidebarMenuItemIcon,
    Action: SidebarMenuItemAction
});

export { SidebarMenuItem, type SidebarMenuItemProps };
