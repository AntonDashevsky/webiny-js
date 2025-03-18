import React, { useMemo } from "react";
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

export interface BaseMenuItemProps {
    label: string;
    icon?: React.ReactNode;
    action?: React.ReactNode;
    children?: React.ReactNode;
}

export interface MenuItemProps
    extends BaseMenuItemProps,
        Omit<React.HTMLAttributes<HTMLButtonElement>, "onClick"> {
    onClick?: () => void;
}

export interface MenuGroupProps
    extends BaseMenuItemProps,
        Omit<React.HTMLAttributes<HTMLDivElement>, "onClick"> {
    onClick?: () => void;
}

export interface MenuLinkProps extends BaseMenuItemProps, React.HTMLAttributes<HTMLAnchorElement> {
    path: string;
}

export const MenuItem = makeDecoratable("MenuItem", ({ label, icon, ...rest }: MenuItemProps) => {
    const mappedProps = useMemo(() => {
        return {
            text: label,
            icon: icon ? <Sidebar.Item.Icon label={label} element={icon} /> : null,
            ...rest
        };
    }, [label, icon, rest]);

    return <Sidebar.Item {...mappedProps} />;
});

export const MenuGroup = makeDecoratable("MenuItem", ({ label, icon, ...rest }: MenuGroupProps) => {
    const mappedProps = useMemo(() => {
        return {
            text: label,
            icon: icon ? <Sidebar.Item.Icon label={label} element={icon} /> : null,
            ...rest
        };
    }, [label, icon, rest]);
    return <Sidebar.Item {...mappedProps} variant={"group-label"} />;
});

export const MenuLink = makeDecoratable(
    "MenuLink",
    ({ label, icon, path, ...rest }: MenuLinkProps) => {
        const location = useLocation();

        const mappedProps = useMemo(() => {
            return {
                text: label,
                icon: icon ? <Sidebar.Item.Icon label={label} element={icon} /> : null,
                to: path,
                ...rest
            };
        }, [label, icon, rest]);

        return <Sidebar.Item {...mappedProps} active={location.pathname === mappedProps.to} />;
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
    Item: MenuItem,
    Link: MenuLink,
    Group: MenuGroup
});
