import React, { useMemo } from "react";
import { SidebarMenuSubButton } from "./SidebarMenuSubButton";
import { Separator } from "~/Separator";
import { cn } from "~/utils";

interface SidebarMenuSubItemProps extends Omit<React.ComponentProps<"li">, "content"> {
    content: React.ReactNode;
    icon?: React.ReactNode;
}

const SidebarMenuSubItem = ({
    content,
    icon,
    children,
    className,
    ...props
}: SidebarMenuSubItemProps) => {
    const sidebarMenuSubButton = useMemo(() => {
        return <SidebarMenuSubButton icon={icon}>{content}</SidebarMenuSubButton>;
    }, [children, icon, content]);

    return (
        <li
            {...props}
            data-sidebar="menu-sub-item"
            className={cn("wby-group/menu-item wby-relative wby-flex ", className)}
        >
            <Separator orientation={"vertical"} variant={"strong"} margin={"none"} className={"wby-h-xl wby-pl-px wby-mr-[calc(theme(margin.sm)-1px)]"} />
            {sidebarMenuSubButton}
        </li>
    );
};
export { SidebarMenuSubItem };
