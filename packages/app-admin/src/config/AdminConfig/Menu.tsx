import React from "react";
import { makeDecoratable } from "~/index";
import { Property, useIdGenerator } from "@webiny/react-properties";
import { MenuItem } from "./Menu/MenuItem";
import { MenuLink } from "./Menu/MenuLink";
import { MenuGroup } from "./Menu/MenuGroup";
import { SupportMenu } from "./Menu/SupportMenu";

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

const BaseMenu = ({
    name,
    parent = null,
    tags = [],
    element,
    remove,
    before,
    after
}: MenuProps) => {
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
};

const DecoratableMenu = makeDecoratable("Menu", BaseMenu);

const BaseFooterMenu = ({ tags, ...props }: MenuProps) => {
    return <BaseMenu {...props} tags={["footer", ...(tags || [])]} />;
};

const DecoratableFooterMenu = makeDecoratable("FooterMenu", BaseFooterMenu);

export const Menu = Object.assign(DecoratableMenu, {
    Item: MenuItem,
    Link: MenuLink,
    Group: MenuGroup,
    Footer: DecoratableFooterMenu,
    Support: SupportMenu
});
