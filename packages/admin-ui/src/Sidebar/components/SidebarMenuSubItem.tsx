import React, { useMemo } from "react";
import { cn } from "~/utils";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@radix-ui/react-collapsible";
import { SidebarMenuSubButton } from "./SidebarMenuSubButton";
import { SidebarMenuSubItemIndentation } from "./SidebarMenuSubItemIndentation";
import { SidebarMenuSub } from "./SidebarMenuSub";
import { IconButton } from "~/Button";
import { ReactComponent as KeyboardArrowRightIcon } from "@material-design-icons/svg/outlined/keyboard_arrow_down.svg";
import { LinkProps, To } from "@webiny/react-router";
import { type SidebarMenuItemBaseProps } from "~/Sidebar/components/SidebarMenuItem";

export interface SidebarMenuSubItemBaseProps extends SidebarMenuItemBaseProps {
    lvl?: number;
}

export type SidebarMenuSubItemButtonProps = SidebarMenuSubItemBaseProps & { to?: never };
export type SidebarMenuSubItemLinkProps = SidebarMenuSubItemBaseProps & LinkProps & { to: To };

type SidebarMenuSubItemProps = SidebarMenuSubItemButtonProps | SidebarMenuSubItemLinkProps;

const SidebarMenuSubItem = ({
    children,
    className,
    lvl = 1,
    ...buttonProps
}: SidebarMenuSubItemProps) => {
    const nextLevel = lvl + 1;

    const sidebarMenuSubButton = useMemo(() => {
        if (!children) {
            return (
                <>
                    <SidebarMenuSubItemIndentation lvl={lvl} variant={buttonProps.variant} />
                    <SidebarMenuSubButton {...buttonProps} />
                </>
            );
        }

        const chevron = (
            <CollapsibleTrigger asChild>
                <IconButton
                    variant={"ghost"}
                    size={"xs"}
                    className={
                        "wby-ml-auto wby-transition-transform wby-duration-200 group-data-[state=open]/menu-sub-item-collapsible:wby-rotate-180"
                    }
                    color={"neutral-strong"}
                    data-sidebar={"menu-item-expanded-indicator"}
                    icon={<KeyboardArrowRightIcon />}
                />
            </CollapsibleTrigger>
        );

        return (
            <Collapsible defaultOpen className="wby-w-full wby-group/menu-sub-item-collapsible">
                <div className={"wby-flex wby-items-center"}>
                    <SidebarMenuSubItemIndentation lvl={lvl} />
                    <SidebarMenuSubButton {...buttonProps} action={chevron} />
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
    }, [children, buttonProps, lvl]);

    return (
        <li
            data-sidebar="menu-sub-item"
            className={cn("wby-group/menu-sub-item wby-relative wby-flex", className)}
        >
            {sidebarMenuSubButton}
        </li>
    );
};
export { SidebarMenuSubItem, type SidebarMenuSubItemProps };
