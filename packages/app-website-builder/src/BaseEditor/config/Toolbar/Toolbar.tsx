import React from "react";
import { makeDecoratable } from "@webiny/app-admin";
import { Element as BaseElement, ElementProps as BaseElementProps } from "../Element";
import { Layout } from "./Layout";
import { Elements as BaseElements, ElementsProps as BaseElementsProps } from "../Elements";
import { createGetId } from "../createGetId";

const SCOPE = "toolbar";

const BaseToolbar = () => {
    return <Layout />;
};

const getElementId = createGetId(SCOPE)();

export type ElementProps = Omit<BaseElementProps, "scope" | "id">;

const BaseToolbarElement = makeDecoratable("ToolbarElement", (props: ElementProps) => {
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

export type ElementsProps = Omit<BaseElementsProps, "scope">;

const Elements = makeDecoratable("ToolbarElements", (props: ElementsProps) => {
    return <BaseElements {...props} scope={SCOPE} />;
});

export const Toolbar = Object.assign(BaseToolbar, {
    Layout,
    Element: BaseToolbarElement,
    Elements
});
