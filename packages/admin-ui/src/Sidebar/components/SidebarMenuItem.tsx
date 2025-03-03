import React, { useMemo } from "react";
import { cn, makeDecoratable, withStaticProps } from "~/utils";
import { SidebarMenuButton } from "./SidebarMenuButton";
import { SidebarMenuItemIcon } from "./SidebarMenuItemIcon";
import { SidebarMenuItemAction } from "./SidebarMenuItemAction";
import { SidebarMenuSub } from "./SidebarMenuSub";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@radix-ui/react-collapsible";
import { SidebarMenuSubItem } from "./SidebarMenuSubItem";
import { Icon } from "~/Icon";
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
            return (
                <SidebarMenuButton {...buttonProps}>
                    <span>{buttonProps.text}</span>
                    {buttonProps.action}
                </SidebarMenuButton>
            );
        }

        return (
            <Collapsible defaultOpen className="wby-w-full wby-group/menu-item-collapsible">
                <CollapsibleTrigger asChild>
                    <SidebarMenuButton {...buttonProps}>
                        <span>{buttonProps.text}</span>
                        <Icon
                            size={"sm"}
                            className={
                                "wby-ml-auto wby-transition-transform wby-duration-200 group-data-[state=open]/menu-item-collapsible:wby-rotate-180"
                            }
                            color={"neutral-strong"}
                            data-sidebar={"menu-item-expanded-indicator"}
                            label={"Open/close"}
                            icon={<KeyboardArrowRightIcon />}
                        />
                    </SidebarMenuButton>
                </CollapsibleTrigger>
                <CollapsibleContent>
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
            className={cn("wby-group/menu-item wby-relative wby-px-xs-plus", className)}
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
