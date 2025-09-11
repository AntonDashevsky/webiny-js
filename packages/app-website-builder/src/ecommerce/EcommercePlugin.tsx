import React, { useEffect } from "react";
import { Editor } from "~/index";
import type { IEcommerceApiFactory, SettingsInput } from "./types";
import { CreateInputRenderers } from "./CreateInputRenderers";
import type { ResourcePageProps } from "./components/ResourcePage";
import { ResourcePage } from "./components/ResourcePage";
import { createGenericContext } from "@webiny/app";
import { EcommerceApiManifest, useEcommerceApiProvider, usePageTypes } from "~/features";

export interface CustomResourcePickerProps<T = any> {
    value?: T;
    onChange(val: T | undefined): void;
}

export type EcommercePluginProps = {
    name: string;
    init: IEcommerceApiFactory;
    settings: SettingsInput[];
    children?: React.ReactNode;
};

const Context = createGenericContext<{ pluginName: string }>("EcommercePluginContext");

const EcommercePluginBase = (props: EcommercePluginProps) => {
    const provider = useEcommerceApiProvider();

    useEffect(() => {
        provider.addApiManifest(new EcommerceApiManifest(props.name, props.init, props.settings));
    }, []);

    return (
        <Context.Provider pluginName={props.name}>
            <Editor.EditorConfig priority={"secondary"}>
                <CreateInputRenderers pluginName={props.name} />
            </Editor.EditorConfig>
            {props.children}
        </Context.Provider>
    );
};

export type PageTypeProps = Omit<ResourcePageProps, "apiName">;

const PageType = (props: PageTypeProps) => {
    const { pluginName } = Context.useHook();
    const { addPageType } = usePageTypes();

    useEffect(() => {
        addPageType({
            name: props.name,
            label: props.label,
            element: <ResourcePage {...props} apiName={pluginName} />
        });
    }, []);

    return null;
};

export const EcommercePlugin = Object.assign(EcommercePluginBase, { PageType });
