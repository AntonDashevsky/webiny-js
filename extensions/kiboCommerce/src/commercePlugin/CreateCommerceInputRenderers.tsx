import React, { useMemo } from "react";
import {
    EditorConfig,
    type ElementInputRendererProps
} from "@webiny/app-website-builder/BaseEditor";
import { FormComponentLabel } from "@webiny/admin-ui";
import { ResourcesPickerButton } from "../pluginTools/editors/ResourcesPicker";
import { PickResourcesListButton } from "../pluginTools/editors/ResourcesList";
import { CommerceApi } from "./CommercePlugin";
import capitalize from "lodash/capitalize";

const { ElementInput } = EditorConfig;

export interface CommerceApiFactory {
    name: string;
    init: () => CommerceApi;
}

interface CreateCommerceInputRenderersProps {
    apiFactory: CommerceApiFactory;
}

const createSingleResourcePicker = (pluginName: string, api: CommerceApi, resourceName: string) => {
    const SingleResourcePicker = (props: ElementInputRendererProps) => {
        return (
            <div className={"wby-w-full"}>
                <FormComponentLabel text={props.input.label} />
                <ResourcesPickerButton
                    api={api}
                    resourceName={resourceName}
                    pluginName={pluginName}
                    value={props.value}
                    onChange={props.onChange}
                />
            </div>
        );
    };

    SingleResourcePicker.displayName = `${pluginName}${resourceName}`;

    return SingleResourcePicker;
};

const createResourceListPicker = (pluginName: string, api: CommerceApi, resourceName: string) => {
    const ListResourcePicker = (props: ElementInputRendererProps) => {
        return (
            <div className={"wby-w-full"}>
                <FormComponentLabel text={props.input.label} />
                <PickResourcesListButton
                    api={api}
                    resourceName={resourceName}
                    pluginName={pluginName}
                    value={props.value}
                    onChange={props.onChange}
                />
            </div>
        );
    };

    ListResourcePicker.displayName = `${pluginName}${resourceName}List`;

    return ListResourcePicker;
};

export const CreateCommerceInputRenderers = ({ apiFactory }: CreateCommerceInputRenderersProps) => {
    const pluginName = apiFactory.name;
    const api = useMemo(() => apiFactory.init(), []);

    const resources = Object.keys(api);

    const inputRenderers = resources.map(resourceName => {
        return (
            <React.Fragment key={resourceName}>
                {/* Single resource. */}
                <ElementInput.Renderer
                    name={`${pluginName}${capitalize(resourceName)}`}
                    component={createSingleResourcePicker(pluginName, api, resourceName)}
                />
                {/* List of resources. */}
                <ElementInput.Renderer
                    name={`${pluginName}${capitalize(resourceName)}List`}
                    component={createResourceListPicker(pluginName, api, resourceName)}
                />
            </React.Fragment>
        );
    });

    return <>{inputRenderers}</>;
};
