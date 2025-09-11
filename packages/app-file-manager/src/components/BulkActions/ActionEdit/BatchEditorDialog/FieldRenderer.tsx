import React from "react";
import { FieldElement, ModelProvider } from "@webiny/app-headless-cms";
import { Bind, BindPrefix } from "@webiny/form";
import { Grid } from "@webiny/admin-ui";
import type { FieldDTO } from "~/components/BulkActions/ActionEdit/domain/index.js";
import { OperatorType } from "~/components/BulkActions/ActionEdit/domain/index.js";
import { useFileModel } from "~/hooks/useFileModel.js";
import { useFileManagerViewConfig } from "~/modules/FileManagerRenderer/FileManagerView/FileManagerViewConfig.js";

export interface FieldRendererProps {
    name: string;
    operator: string;
    field: FieldDTO;
}

export const FieldRenderer = (props: FieldRendererProps) => {
    const fileModel = useFileModel();
    const { browser } = useFileManagerViewConfig();

    if (!props.operator || props.operator === OperatorType.REMOVE) {
        return null;
    }

    const customFieldRenderer = browser.bulkEditFields.find(
        field => field.name === props.field.value
    );

    const renderer = customFieldRenderer ? (
        <BindPrefix name={props.name}>{customFieldRenderer.element}</BindPrefix>
    ) : (
        <BindPrefix name={props.name + ".extensions"}>
            <FieldElement field={props.field.raw} Bind={Bind as any} contentModel={fileModel} />
        </BindPrefix>
    );

    return (
        <ModelProvider model={fileModel}>
            <Grid.Column span={12}>{renderer}</Grid.Column>
        </ModelProvider>
    );
};
