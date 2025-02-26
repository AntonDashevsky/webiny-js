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
    active?: boolean;
    lvl?: number;
}

const SidebarMenuSubItem = ({
    content,
    icon,
    active,
    children,
    className,
    lvl = 1,
    ...props
}: SidebarMenuSubItemProps) => {
    const sidebarMenuSubButton = useMemo(() => {
        if (!children) {
            return (
                <>
                    <SidebarMenuSubItemIndentation lvl={lvl} />
                    <SidebarMenuSubButton icon={icon} active={active}>
                        <span>{content}</span>
                    </SidebarMenuSubButton>
                </>
            );
        }

        return (
            <Collapsible defaultOpen className="wby-group/collapsiblex wby-w-full">
                <div className={"wby-flex wby-items-center"}>
                    <SidebarMenuSubItemIndentation lvl={lvl} />
                    <CollapsibleTrigger asChild>
                        <SidebarMenuSubButton icon={icon}>
                            <span>{content}</span>
                            <Icon
                                size={"sm"}
                                className={
                                    "wby-ml-auto wby-transition-transform wby-duration-200 group-data-[state=open]/collapsiblex:wby-rotate-180"
                                }
                                color={"neutral-strong"}
                                data-role={"open-close-indicator"}
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
                                return <SidebarMenuSubItem {...child.props} lvl={2} />;
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
