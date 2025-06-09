import React from "react";

import { observer } from "mobx-react-lite";
import { Bind } from "@webiny/form";
import { Cell, Grid } from "@webiny/ui/Grid/index.js";
import { Select } from "@webiny/ui/Select/index.js";

import { FieldRenderer } from "~/components/BulkActions/ActionEdit/BatchEditorDialog/FieldRenderer.js";
import { type OperationFormData } from "~/components/BulkActions/ActionEdit/BatchEditorDialog/BatchEditorDialogPresenter.js";

export interface OperationProps {
    operation: OperationFormData;
    name: string;
    onDelete: () => void;
    onSetOperationFieldData: (data: string) => void;
}

export const Operation = observer((props: OperationProps) => {
    return (
        <Grid>
            <Cell span={6}>
                <Bind name={`${props.name}.field`}>
                    {({ value, validation }) => (
                        <Select
                            label={"Field"}
                            options={props.operation.fieldOptions}
                            value={value}
                            onChange={data => props.onSetOperationFieldData(data)}
                            validation={validation}
                        />
                    )}
                </Bind>
            </Cell>
            <Cell span={6}>
                {props.operation.field && (
                    <Bind name={`${props.name}.operator`}>
                        {({ value, onChange, validation }) => (
                            <Select
                                label={"Operation"}
                                options={props.operation.operatorOptions}
                                value={value}
                                onChange={onChange}
                                validation={validation}
                            />
                        )}
                    </Bind>
                )}
            </Cell>
            {props.operation.selectedField ? (
                <FieldRenderer
                    operator={props.operation.operator}
                    field={props.operation.selectedField}
                    name={`${props.name}.value`}
                />
            ) : null}
        </Grid>
    );
});
