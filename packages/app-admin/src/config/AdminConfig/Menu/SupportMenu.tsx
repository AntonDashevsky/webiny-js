import React from "react";
import { makeDecoratable } from "~/index";
import { Property, useIdGenerator } from "@webiny/react-properties";
import { SupportMenuItem } from "./SupportMenu/SupportMenuItem";
import { SupportMenuLink } from "./SupportMenu/SupportMenuLink";

export interface SupportMenuProps {
    name: string;
    element?: React.ReactElement;
    remove?: boolean;
    before?: string;
    after?: string;
}

export type SupportMenuConfig = Pick<SupportMenuProps, "name" | "element">;

const BaseSupportMenu = ({ name, element, remove, before, after }: SupportMenuProps) => {
    const getId = useIdGenerator("Menu");

    const placeAfter = after !== undefined ? getId(after) : undefined;
    const placeBefore = before !== undefined ? getId(before) : undefined;

    return (
        <Property
            id={getId(name)}
            name={"supportMenus"}
            remove={remove}
            array={true}
            before={placeBefore}
            after={placeAfter}
        >
            <Property id={getId(name, "name")} name={"name"} value={name} />
            <Property id={getId(name, "element")} name={"element"} value={element} />
        </Property>
    );
};

const DecoratableMenu = makeDecoratable("Menu", BaseSupportMenu);

export const SupportMenu = Object.assign(DecoratableMenu, {
    Item: SupportMenuItem,
    Link: SupportMenuLink
});
