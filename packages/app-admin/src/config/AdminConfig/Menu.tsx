import React from "react";
import { makeDecoratable } from "~/index";
import { Property, useIdGenerator } from "@webiny/react-properties";
import { Sidebar, withStaticProps } from "@webiny/admin-ui";
import { useLocation } from "@webiny/react-router";

export interface MenuProps {
    name: string;
    parent?: string | null;
    tags?: string[];
    element?: React.ReactElement;
    remove?: boolean;
    before?: string;
    after?: string;
}

export type MenuConfig = Pick<MenuProps, "name" | "parent" | "tags" | "element">;

export interface MenuItemProps extends React.HTMLAttributes<HTMLDivElement> {
    label: string;
    path?: string;
    onClick?: () => void;
    icon?: React.ReactNode;
    action?: React.ReactNode;
    children?: React.ReactNode;
}

export const MenuItem = makeDecoratable(
    "MenuItem",
    ({ label, path, icon, action, children, onClick }: MenuItemProps) => {
        const location = useLocation();
        const sharedProps = {
            text: label,
            icon: icon ? <Sidebar.Item.Icon label={label} element={icon} /> : null,
            action,
            children
        };

        if (path) {
            return <Sidebar.Item {...sharedProps} to={path} active={location.pathname === path} />;
        }

        if (onClick) {
            return <Sidebar.Item {...sharedProps} onClick={onClick} />;
        }

        // If not click nor path was assigned, we treat this as a group label.
        return <Sidebar.Item {...sharedProps} variant={"group-label"} />;
    }
);

const MenuBase = makeDecoratable(
    "Menu",
    ({ name, parent = null, tags = [], element, remove, before, after }: MenuProps) => {
        const getId = useIdGenerator("Menu");

        const placeAfter = after !== undefined ? getId(after) : undefined;
        const placeBefore = before !== undefined ? getId(before) : undefined;

        return (
            <Property
                id={getId(name)}
                name={"menus"}
                remove={remove}
                array={true}
                before={placeBefore}
                after={placeAfter}
            >
                <Property id={getId(name, "name")} name={"name"} value={name} />
                <Property id={getId(name, "parent")} name={"parent"} value={parent} />
                <Property id={getId(name, "tags")} name={"tags"} value={tags} />
                <Property id={getId(name, "element")} name={"element"} value={element} />
            </Property>
        );
    }
);

export const Menu = withStaticProps(MenuBase, {
    Item: MenuItem
});
