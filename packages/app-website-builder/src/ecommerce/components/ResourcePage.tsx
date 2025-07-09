import React, { useEffect, useMemo } from "react";
import { Grid, Input, Skeleton } from "@webiny/admin-ui";
import { UnsetOnUnmount, useBind, useForm } from "@webiny/form";
import { validation } from "@webiny/validation";
import { createResourcePicker } from "~/ecommerce/createResourcePicker";
import { useEcommerceApi } from "~/ecommerce/features/apis";
import { adaptInputToBind } from "./adaptInputToBind";
import { Resource } from "../types";
import { toTitleCaseLabel } from "~/ecommerce/components/toTitleCaseLabel";

export interface ResourcePageProps {
    apiName: string;
    name: string;
    label: string;
    resourceType: string;
    previewPath: (resource: Resource) => string;
}

export const ResourcePage = (props: ResourcePageProps) => {
    const { api } = useEcommerceApi(props.apiName);

    const ResourcePicker = useMemo(() => {
        if (!api) {
            return () => null;
        }

        const ElementInput = createResourcePicker(props.apiName, api, props.resourceType);
        return adaptInputToBind(ElementInput);
    }, [api]);

    const resourceIdBind = useBind({
        name: "resourceId",
        validators: [validation.create("required")]
    });

    const resourceTypeBind = useBind({
        name: "resourceType",
        defaultValue: props.resourceType
    });

    const titleBind = useBind({ name: "title", validators: [validation.create("required")] });
    const pathBind = useBind({ name: "path", validators: [validation.create("required")] });

    useEffect(() => {
        if (!api || !resourceIdBind) {
            return;
        }

        if (resourceIdBind.value) {
            api[props.resourceType].findById(resourceIdBind.value).then(resource => {
                titleBind.onChange(resource.title);
                pathBind.onChange(props.previewPath(resource));
            });
        }
    }, [resourceIdBind.value]);

    const onResourceChange = (resource: Resource) => {
        resourceIdBind.onChange(resource);
    };

    return (
        <>
            <UnsetOnUnmount name={"resourceType"}>
                <Input {...resourceTypeBind} type={"hidden"} />
            </UnsetOnUnmount>
            <Grid.Column span={12}>
                <div className={"wby-border-sm wby-rounded-md wby-border-neutral-muted wby-p-sm"}>
                    {api ? (
                        <UnsetOnUnmount name={"resourceId"}>
                            <ResourcePicker
                                {...resourceIdBind}
                                label={toTitleCaseLabel(props.resourceType)}
                                onChange={onResourceChange}
                            />
                        </UnsetOnUnmount>
                    ) : (
                        <Skeleton />
                    )}
                </div>
            </Grid.Column>
            <Grid.Column span={12}>
                <UnsetOnUnmount name={"title"}>
                    <Input label={"Title"} {...titleBind} disabled={!resourceIdBind.value} />
                </UnsetOnUnmount>
            </Grid.Column>
            <Grid.Column span={12}>
                <UnsetOnUnmount name={"path"}>
                    <Input label={"Path"} {...pathBind} disabled={!resourceIdBind.value} />
                </UnsetOnUnmount>
            </Grid.Column>
        </>
    );
};
