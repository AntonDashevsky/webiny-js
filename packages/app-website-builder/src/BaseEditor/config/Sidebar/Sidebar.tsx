import React from "react";
import { makeDecoratable } from "@webiny/app-admin";
import type { ElementProps as CoreElementProps } from "../Element";
import { Element as CoreElement } from "../Element";
import { Layout } from "./Layout";
import type { ElementsProps as BaseElementsProps } from "../Elements";
import { Elements as BaseElements } from "../Elements";
import { Tab } from "./Tab";
import { createGetId } from "../createGetId";
import { ScrollableContainer } from "../Sidebar/ScrollableContainer";

const SCOPE = "sidebar";

const BaseSidebar = () => {
    return <Layout />;
};

export type ScopedElementProps = Omit<CoreElementProps, "scope">;

const ScopedElement = makeDecoratable("SidebarScopedElement", (props: ScopedElementProps) => {
    return <CoreElement {...props} scope={SCOPE} />;
});

const getElementId = createGetId(SCOPE)();

export type BaseElementProps = Omit<ScopedElementProps, "id">;

const BaseElement = makeDecoratable("SidebarElement", (props: BaseElementProps) => {
    return (
        <ScopedElement
            {...props}
            id={getElementId(props.name)}
            before={props.before ? getElementId(props.before) : undefined}
            after={props.after ? getElementId(props.after) : undefined}
        />
    );
});

export type ElementsProps = Omit<BaseElementsProps, "scope">;

const Elements = makeDecoratable("SidebarElements", (props: ElementsProps) => {
    return <BaseElements {...props} scope={SCOPE} />;
});

export type GroupProps = Omit<BaseElementProps, "group">;

const BaseGroup = makeDecoratable("SidebarGroup", (props: GroupProps) => {
    return (
        <ScopedElement
            {...props}
            group={"groups"}
            id={getElementId(props.name)}
            before={props.before ? getElementId(props.before) : undefined}
            after={props.after ? getElementId(props.after) : undefined}
        />
    );
});

export const Sidebar = Object.assign(BaseSidebar, {
    Layout,
    Element: BaseElement,
    Elements,
    Group: Object.assign(BaseGroup, { Tab }),
    ScrollableContainer
});
