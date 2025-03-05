import React from "react";
import { makeDecoratable } from "~/index";
import { Property, useIdGenerator } from "@webiny/react-properties";
import { Sidebar, withStaticProps } from "@webiny/admin-ui";

export interface MenuProps {
    name: string;
    parent?: string;
    element?: React.ReactElement;
    remove?: boolean;
    before?: string;
    after?: string;
}

export const MenuItem = makeDecoratable(
    "MenuItem",
    ({ label }: { label: string; path?: string }) => {
        return <Sidebar.Item text={label} />;
    }
);

const MenuBase = makeDecoratable("Menu", ({ name, remove, before, after }: MenuProps) => {
    const getId = useIdGenerator("Menu");

    const placeAfter = after !== undefined ? getId(after) : undefined;
    const placeBefore = before !== undefined ? getId(before) : undefined;

    return (
        <>
            <Property
                id={getId(name)}
                name={"menus"}
                remove={remove}
                array={true}
                before={placeBefore}
                after={placeAfter}
            >
                <Property id={getId(name, "name")} name={"name"} value={name} />
                <Property id={getId(name, "parent")} name={"parent"} value={name} />
            </Property>
        </>
    );
});

export const Menu = withStaticProps(MenuBase, {
    Item: MenuItem
});
