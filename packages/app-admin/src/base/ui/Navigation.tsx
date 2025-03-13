import React, { createContext, Fragment, useContext } from "react";
import { createVoidComponent, makeDecoratable } from "@webiny/app";
import { MenuData, MenuUpdater, Tags } from "~/index";

export interface NavigationContext {
    menuItems: MenuData[];
    setMenu(id: string, update: MenuUpdater): void;
    removeMenu(id: string): void;
}

const NavigationContext = createContext<NavigationContext>({
    menuItems: [],
    setMenu: () => {
        return void 0;
    },
    removeMenu: () => {
        return void 0;
    }
});
NavigationContext.displayName = "NavigationContext";

export function useNavigation() {
    return useContext(NavigationContext);
}

export const Navigation = makeDecoratable("Navigation", () => {
    return (
        <Tags tags={{ location: "navigation" }}>
            <NavigationRenderer />
        </Tags>
    );
});

export const NavigationRenderer = makeDecoratable("NavigationRenderer", createVoidComponent());

interface MenuItemContext {
    menuItem?: MenuData;
    depth: number;
}

const MenuItemContext = React.createContext<MenuItemContext>({
    menuItem: undefined,
    depth: -1
});
MenuItemContext.displayName = "MenuItemContext";

export function useMenuItem() {
    return React.useContext(MenuItemContext);
}

export interface MenuItemsProps {
    menuItems: MenuData[];
}

export const MenuItems = makeDecoratable("MenuItems", ({ menuItems }: MenuItemsProps) => {
    const menuItem = useMenuItem();

    const depth = menuItem ? menuItem.depth : -1;

    return (
        <Fragment>
            {menuItems.map(menuItem => (
                <MenuItemContext.Provider
                    key={menuItem.name}
                    value={{ menuItem, depth: depth + 1 }}
                >
                    <MenuItem />
                </MenuItemContext.Provider>
            ))}
        </Fragment>
    );
});

export const MenuItem = () => {
    return <MenuItemRenderer />;
};

export const MenuItemRenderer = makeDecoratable("MenuItemRenderer", createVoidComponent());
