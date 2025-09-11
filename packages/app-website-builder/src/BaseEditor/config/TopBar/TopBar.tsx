import React from "react";
import { makeDecoratable } from "@webiny/app-admin";
import type { ElementProps as BaseElementProps } from "../Element.js";
import { Element as BaseElement } from "../Element.js";
import type { ElementsProps as BaseElementsProps } from "../Elements.js";
import { Elements as BaseElements } from "../Elements.js";
import { Divider } from "./Divider.js";
import { Layout } from "./Layout.js";
import { createGetId } from "../createGetId.js";
import { MenuItem } from "./MenuItem.js";

const SCOPE = "topBar";

const BaseTopBar = () => {
    return <Layout />;
};

const getElementId = createGetId(SCOPE)();

export type ElementProps = Omit<BaseElementProps, "scope" | "id">;

const Element = makeDecoratable("TopBarElement", (props: ElementProps) => {
    return (
        <BaseElement
            {...props}
            scope={SCOPE}
            id={getElementId(props.name)}
            before={props.before ? getElementId(props.before) : undefined}
            after={props.after ? getElementId(props.after) : undefined}
        />
    );
});

export type ActionProps = Omit<ElementProps, "group">;

const Action = makeDecoratable("TopBarAction", (props: ActionProps) => {
    return <Element {...props} group={"actions"} />;
});

export type DropdownActionProps = Omit<ElementProps, "group">;

const BaseDropdownAction = makeDecoratable("TopBarDropdownAction", (props: DropdownActionProps) => {
    return <Element {...props} group={"dropdownActions"} />;
});

export type ElementsProps = Omit<BaseElementsProps, "scope">;

const Elements = makeDecoratable("TopBarElements", (props: ElementsProps) => {
    return <BaseElements {...props} scope={SCOPE} />;
});

export const TopBar = Object.assign(BaseTopBar, {
    Element,
    Elements,
    Layout,
    Divider,
    Action,
    DropdownAction: Object.assign(BaseDropdownAction, { MenuItem })
});
