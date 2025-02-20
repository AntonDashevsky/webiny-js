import React, { useMemo } from "react";
import { SidebarMenuSubButton } from "./SidebarMenuSubButton";
import { Separator } from "~/Separator";
import { cn } from "~/utils";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "~/Collapsible";
import { SidebarMenuButton } from "~/Sidebar/components/SidebarMenuButton";
import { Icon } from "~/Icon";
import { SidebarMenuSub } from "~/Sidebar/components/SidebarMenuSub";
import { ReactComponent as KeyboardArrowRightIcon } from "@material-design-icons/svg/outlined/keyboard_arrow_down.svg";

interface SidebarMenuSubItemProps extends Omit<React.ComponentProps<"li">, "content"> {
    content: React.ReactNode;
    icon?: React.ReactNode;
    lvl?: number;
}

const SidebarMenuSubItem = ({
    content,
    icon,
    children,
    className,
    lvl = 1,
    ...props
}: SidebarMenuSubItemProps) => {
    const sidebarMenuSubButton = useMemo(() => {
        if (!children) {
            return <SidebarMenuSubButton icon={icon}>{content}</SidebarMenuSubButton>;
        }

        return (
            <Collapsible defaultOpen className="wby-group/collapsible">
                <CollapsibleTrigger asChild>
                    <SidebarMenuButton icon={icon}>
                        {content}
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
                                return <SidebarMenuSubItem {...child.props} lvl={2}/>;
                            }
                            return child;
                        })}
                    </SidebarMenuSub>
                </CollapsibleContent>
            </Collapsible>
        );
    }, [children, icon, content]);

    const indentation = Array.from({ length: lvl }, () => (
        <div className={"wby-ml-md"}>
            <Separator
                key={lvl}
                orientation={"vertical"}
                margin={"none"}
                variant={"strong"}
                className={"wby-h-xl wby-ml-px"}
            />
        </div>
    ));

    return (
        <li
            {...props}
            data-sidebar="menu-sub-item"
            className={cn("wby-group/menu-item wby-relative wby-flex ", className)}
        >
            <div className={"wby-gap-x-xs wby-flex wby-mr-sm"}>
                {indentation}
            </div>

            {sidebarMenuSubButton}
        </li>
    );
};
export { SidebarMenuSubItem };
