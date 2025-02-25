import React from "react";
import { Separator } from "~/Separator";

export interface SidebarMenuSubItemIndentationProps extends Omit<React.ComponentProps<"li">, "content"> {
    lvl: number;
}

const SidebarMenuSubItemIndentation = ({ lvl }: SidebarMenuSubItemIndentationProps) => {
    return (
        <div className={"wby-gap-x-xs wby-flex wby-mr-sm"}>
            {Array.from({ length: lvl }, (_, index) => (
                <div data-sidebar={"indentation"} className={"wby-ml-md"} key={lvl + index}>
                    <Separator
                        orientation={"vertical"}
                        margin={"none"}
                        variant={"strong"}
                        className={"wby-h-xl wby-ml-px"}
                    />
                </div>
            ))}
        </div>
    );
};

export { SidebarMenuSubItemIndentation };
