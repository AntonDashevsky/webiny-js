import React from "react";
import { SidebarTrigger } from "./SidebarTrigger";
import { Separator } from "~/Separator";

interface SidebarHeaderProps extends Omit<React.ComponentProps<"div">, "title"> {
    icon?: React.ReactNode;
    title?: React.ReactNode;
}

const SidebarHeader = ({ title, icon }: SidebarHeaderProps) => {
    return (
        <div>
            <div className={"wby-px-xs-plus"}>
                <div
                    data-sidebar="header"
                    className={"wby-flex wby-justify-between wby-items-center wby-gap-sm wby-py-xs-plus wby-px-sm"}
                >
                    <div className={"wby-flex wby-items-center wby-gap-x-sm"}>
                        {icon}
                        <span className={"wby-text-md wby-font-semibold wby-truncate"}>{title}</span>
                    </div>

                    <SidebarTrigger />
                </div>
            </div>
            <div className={"wby-p-sm"}>
                <Separator variant={"subtle"} margin={'xs'} />
            </div>
        </div>
    );
};

export { SidebarHeader, type SidebarHeaderProps };
