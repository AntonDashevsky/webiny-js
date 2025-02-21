import React from "react";
import { makeDecoratable } from "@webiny/app-admin";
import { Property, useIdGenerator } from "@webiny/react-properties";

export interface MenuProps {
    name: string;
    parent?: string;
    remove?: boolean;
    before?: string;
    after?: string;
}

export const Menu = makeDecoratable(
    "Menu",
    ({ name, remove, before, after }: MenuProps) => {
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
    }
);
