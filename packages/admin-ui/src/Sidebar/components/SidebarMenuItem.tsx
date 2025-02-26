import React, { useMemo } from "react";
import { cn, withStaticProps } from "~/utils";
import { SidebarMenuButton } from "./SidebarMenuButton";
import { SidebarMenuItemIcon } from "./SidebarMenuItemIcon";
import { SidebarMenuSub } from "./SidebarMenuSub";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@radix-ui/react-collapsible";
import { SidebarMenuSubItem } from "./SidebarMenuSubItem";
import { Icon } from "~/Icon";
import { ReactComponent as KeyboardArrowRightIcon } from "@material-design-icons/svg/outlined/keyboard_arrow_down.svg";

interface SidebarMenuItemProps extends Omit<React.ComponentProps<"li">, "content"> {
    content: React.ReactNode;
    icon?: React.ReactNode;
    active?: boolean;
}

const SidebarMenuItemBase = ({
    content,
    icon,
    active,
    className,
    children,
    ...props
}: SidebarMenuItemProps) => {
    const sidebarMenuButton = useMemo(() => {
        if (!children) {
            return (
                <SidebarMenuButton icon={icon} active={active}>
                    <span>{content}</span>
                </SidebarMenuButton>
            );
        }

        return (
            <Collapsible defaultOpen className="wby-group/collapsible">
                <CollapsibleTrigger asChild>
                    <SidebarMenuButton icon={icon}>
                        <span>{content}</span>
                        <Icon
                            size={"sm"}
                            className={
                                "wby-ml-auto wby-transition-transform wby-duration-200 group-data-[state=open]/collapsible:wby-rotate-180"
                            }
                            color={"neutral-strong"}
                            data-role={"open-close-indicator"}
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

const SidebarMenuItem = withStaticProps(SidebarMenuItemBase, {
    Icon: SidebarMenuItemIcon
});

export { SidebarMenuItem, type SidebarMenuItemProps };
