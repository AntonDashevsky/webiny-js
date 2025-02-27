import React, { useMemo } from "react";
import { cn } from "~/utils";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@radix-ui/react-collapsible";
import { SidebarMenuSubButton } from "./SidebarMenuSubButton";
import { SidebarMenuSubItemIndentation } from "./SidebarMenuSubItemIndentation";
import { SidebarMenuSub } from "./SidebarMenuSub";
import { Icon } from "~/Icon";
import { ReactComponent as KeyboardArrowRightIcon } from "@material-design-icons/svg/outlined/keyboard_arrow_down.svg";

interface SidebarMenuSubItemProps extends Omit<React.ComponentProps<"li">, "content"> {
    content: React.ReactNode;
    icon?: React.ReactNode;
    variant?: "group-label"
    active?: boolean;
    disabled?: boolean;
    lvl?: number;
}

const SidebarMenuSubItem = ({
    content,
    icon,
    variant,
    active,
    disabled,
    children,
    className,
    lvl = 1,
    ...props
}: SidebarMenuSubItemProps) => {
    const nextLevel = lvl + 1;
    const buttonProps = { icon, active, disabled, variant };

    const sidebarMenuSubButton = useMemo(() => {
        if (!children) {
            return (
                <>
                    <SidebarMenuSubItemIndentation lvl={lvl} variant={variant} />
                    <SidebarMenuSubButton {...buttonProps}>
                        <span>{content}</span>
                    </SidebarMenuSubButton>
                </>
            );
        }

        return (
            <Collapsible defaultOpen className="wby-w-full wby-group/menu-sub-item-collapsible">
                <div className={"wby-flex wby-items-center"}>
                    <SidebarMenuSubItemIndentation lvl={lvl} />
                    <CollapsibleTrigger asChild>
                        <SidebarMenuSubButton {...buttonProps}>
                            <span>{content}</span>
                            <Icon
                                size={"sm"}
                                className={
                                    "wby-ml-auto wby-transition-transform wby-duration-200 group-data-[state=open]/menu-sub-item-collapsible:wby-rotate-180"
                                }
                                color={"neutral-strong"}
                                data-sidebar={"menu-sub-item-expanded-indicator"}
                                label={"Open/close"}
                                icon={<KeyboardArrowRightIcon />}
                            />
                        </SidebarMenuSubButton>
                    </CollapsibleTrigger>
                </div>
                <CollapsibleContent>
                    <SidebarMenuSub>
                        {React.Children.map(children, child => {
                            if (React.isValidElement(child)) {
                                return <SidebarMenuSubItem {...child.props} lvl={nextLevel} />;
                            }
                            return child;
                        })}
                    </SidebarMenuSub>
                </CollapsibleContent>
            </Collapsible>
        );
    }, [children, icon, content, lvl]);

    return (
        <li
            {...props}
            data-sidebar="menu-sub-item"
            className={cn("wby-group/menu-item wby-relative wby-flex", className)}
        >
            {sidebarMenuSubButton}
        </li>
    );
};
export { SidebarMenuSubItem };
