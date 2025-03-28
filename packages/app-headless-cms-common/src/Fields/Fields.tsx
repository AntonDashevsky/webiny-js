import React from "react";
import { Cell, Grid } from "@webiny/ui/Grid/index.js";
import { FieldElement } from "./FieldElement.js";
import { FieldElementError } from "./FieldElementError.js";
import type {
    CmsEditorContentModel,
    CmsModelField,
    CmsEditorFieldsLayout,
    BindComponent
} from "~/types/index.js";

interface FieldsProps {
    Bind: BindComponent;
    contentModel: CmsEditorContentModel;
    fields: CmsModelField[];
    layout: CmsEditorFieldsLayout;
    gridClassName?: string;
}

const getFieldById = (fields: CmsModelField[], id: string): CmsModelField | null => {
    return fields.find(field => field.id === id) || null;
};

export const Fields = ({ Bind, fields, layout, contentModel, gridClassName }: FieldsProps) => {
    return (
        <Grid className={gridClassName}>
            {layout.map((row, rowIndex) => (
                <React.Fragment key={rowIndex}>
                    {row.map(id => {
                        const field = getFieldById(fields, id) as CmsModelField;

                        return (
                            <Cell span={Math.floor(12 / row.length)} key={id}>
                                {field ? (
                                    <FieldElement
                                        field={field}
                                        Bind={Bind}
                                        contentModel={contentModel}
                                    />
                                ) : (
                                    <FieldElementError
                                        title={`Missing field with id "${id}"!`}
                                        description={
                                            "Make sure field layout contains the correct field ids (hint: check for typos)."
                                        }
                                    />
                                )}
                            </Cell>
                        );
                    })}
                </React.Fragment>
            ))}
        </Grid>
    );
};
