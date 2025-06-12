import React from "react";
import type { Resource, ResourcePickerProps } from "../pluginTools";
import { EditorConfig } from "@webiny/app-website-builder/BaseEditor";
import {
    CreateCommerceInputRenderers,
    type CommerceApiFactory
} from "./CreateCommerceInputRenderers";

export interface CommerceApi {
    [resourceName: string]: {
        resourcePicker?: React.FC<ResourcePickerProps>;
        findById(id: string): Promise<Resource>;
        findByHandle?(handle: string): Promise<Resource>;
        search(search: string, offset?: number, limit?: number): Promise<Resource[]>;
        getRequestObject(id: string, resource?: Resource): string;
    };
}

export type CommercePluginProps = CommerceApiFactory;

export const CommercePlugin = (props: CommercePluginProps) => {
    return (
        <EditorConfig priority={"secondary"}>
            <CreateCommerceInputRenderers apiFactory={props} />
        </EditorConfig>
    );
};
