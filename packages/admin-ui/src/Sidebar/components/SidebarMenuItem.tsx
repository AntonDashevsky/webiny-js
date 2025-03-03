import React, { useMemo } from "react";
import {cn, makeDecoratable, withStaticProps} from "~/utils";
import { SidebarMenuButton } from "./SidebarMenuButton";
import { SidebarMenuItemIcon } from "./SidebarMenuItemIcon";
import { SidebarMenuItemAction } from "./SidebarMenuItemAction";
import { SidebarMenuSub } from "./SidebarMenuSub";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@radix-ui/react-collapsible";
import { SidebarMenuSubItem } from "./SidebarMenuSubItem";
import { Icon } from "~/Icon";
import { ReactComponent as KeyboardArrowRightIcon } from "@material-design-icons/svg/outlined/keyboard_arrow_down.svg";

interface SidebarMenuItemProps extends Omit<React.ComponentProps<"li">, "content"> {
    content: React.ReactNode;
    icon?: React.ReactNode;
    action?: React.ReactNode;
    variant?: "group-label"
    active?: boolean;
    disabled?: boolean;
}

const SidebarMenuItemBase = ({
    content,
    icon,
    action,
    variant,
    active,
    disabled,
    className,
    children,
    ...props
}: SidebarMenuItemProps) => {
    const buttonProps = { icon, active, disabled, variant };

    const sidebarMenuButton = useMemo(() => {
        if (!children) {
            return (
                <SidebarMenuButton {...buttonProps}>
                    <span>{content}</span>
                    {action}
                </SidebarMenuButton>
            );
        }

        return (
            <Collapsible defaultOpen className="wby-w-full wby-group/menu-item-collapsible">
                <CollapsibleTrigger asChild>
                    <SidebarMenuButton {...buttonProps}>
                        <span>{content}</span>
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
    }, [children, icon, content]);

    return (
        <li
            {...props}
            data-sidebar="menu-item"
            className={cn("wby-group/menu-item wby-relative wby-px-xs-plus", className)}
        >
            {sidebarMenuButton}
        </li>
    );
};

const DecoratableSidebarMenuItem = makeDecoratable("SidebarMenuItem", SidebarMenuItemBase)

const SidebarMenuItem = withStaticProps(DecoratableSidebarMenuItem, {
    Icon: SidebarMenuItemIcon,
    Action: SidebarMenuItemAction
});

export { SidebarMenuItem, type SidebarMenuItemProps };
