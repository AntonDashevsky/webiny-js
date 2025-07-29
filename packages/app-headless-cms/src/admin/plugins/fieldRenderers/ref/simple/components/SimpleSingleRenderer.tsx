import React, { useMemo } from "react";
import type { BindComponentRenderProp, CmsModelField } from "~/types";
import type { CmsReferenceValue } from "~/admin/plugins/fieldRenderers/ref/components/types";
import { useContentModels } from "./useContentModels";
import { useReferences } from "./useReferences";
import { Loader } from "~/admin/plugins/fieldRenderers/ref/simple/components/Loader";
import { RadioGroup } from "@webiny/admin-ui";

interface SimpleSingleRendererProps {
    bind: BindComponentRenderProp<CmsReferenceValue | undefined | null>;
    field: CmsModelField;
}

export const SimpleSingleRenderer = (props: SimpleSingleRendererProps) => {
    const { field, bind } = props;

    const value = useMemo(() => {
        return bind.value?.id;
    }, [bind.value]);

    const { models } = useContentModels({
        field
    });

    const references = useReferences({
        models
    });

    const items = useMemo(() => {
        if (!references.entries) {
            return [];
        }

        return references.entries.map(entry => ({
            label: entry.title,
            value: entry.id
        }));
    }, [references]);

    if (references.loading) {
        return <Loader />;
    }

    return (
        <RadioGroup
            {...bind}
            label={field.label}
            description={field.helpText}
            value={value}
            items={items}
            onChange={(value: string) => {
                const selectedItem = references.entries.find(
                    entry => entry.entryId === value.split("#")[0]
                );

                if (!selectedItem) {
                    return;
                }

                bind.onChange({
                    id: selectedItem.id,
                    modelId: selectedItem.model.modelId
                });
            }}
        />
    );
};
