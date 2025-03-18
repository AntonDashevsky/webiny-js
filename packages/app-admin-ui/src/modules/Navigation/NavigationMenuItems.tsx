import React from "react";
import type { MenuConfig } from "@webiny/app-admin/config/AdminConfig/Menu";

export interface MenusProps {
    menus: MenuConfig[];
    where?: { tags?: string[]; parent?: string };
}

export const NavigationMenuItems = (props: MenusProps) => {
    const { menus: allMenus, where = {} } = props;
    const filteredMenus = allMenus.filter(menu => {
        const whereParent = where.parent || null;
        const menuParent = menu.parent;
        if (whereParent !== menuParent) {
            return false;
        }

        const whereTags = where.tags || [];
        const menuTags = menu.tags || [];

        if (whereTags.length > 0) {
            // If not all tags are present, return false.
            return whereTags.every(tag => menuTags.includes(tag));
        }

        return menuTags.length === 0;
    });

    return filteredMenus.map(m => {
        if (!React.isValidElement(m.element)) {
            return null;
        }

        const hasChildMenus = allMenus.some(menu => menu.parent === m.name);
        if (hasChildMenus) {
            return React.cloneElement(
                m.element,
                { key: m.parent + m.name },
                <NavigationMenuItems menus={allMenus} where={{ parent: m.name }} />
            );
        }

        return React.cloneElement(m.element, { key: m.parent + m.name });
    });
};
