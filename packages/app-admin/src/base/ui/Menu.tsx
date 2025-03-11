import React, { createContext } from "react";
import { makeDecoratable } from "~/index";

export interface MenuUpdater {
    (menuItem: MenuData | undefined | null): MenuData | undefined;
}

export interface MenuContext {
    menuItem: MenuData | null;

    setMenu(id: string, updater: MenuUpdater): void;

    removeMenu(id: string): void;
}

const MenuContext = createContext<MenuContext | undefined>(undefined);
MenuContext.displayName = "MenuContext";

export interface MenuProps {
    name: string;
    label?: string;
    path?: string;
    icon?: JSX.Element;
    onClick?: () => void;
    testId?: string;
    tags?: string[];
    target?: string;
    rel?: string;
    element?: JSX.Element;
    pin?: "first" | "last";
}

export interface MenuData extends MenuProps {
    children: MenuData[];
}

export interface AddMenuProps extends MenuProps {
    children?: React.ReactNode;
}

export const createEmptyMenu = (name: string): MenuData => {
    return {
        name,
        tags: [],
        children: []
    };
};

/**
 * Register a new menu item into the Admin app.
 */
export const AddMenu = makeDecoratable("AddMenu", (props: AddMenuProps) => {
    console.warn("Using deprecated `AddMenu` component. Please use ...", props);
    return null;
});
