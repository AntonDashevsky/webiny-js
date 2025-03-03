import React from "react";

export interface SidebarMenuProps {
    children: React.ReactNode;
}

const SidebarMenu = (props: SidebarMenuProps) => (
    <ul
        data-sidebar="menu"
        className={"wby-flex wby-w-full wby-min-w-0 wby-flex-col wby-gap-y-xs"}
        {...props}
    />
);

export { SidebarMenu };
