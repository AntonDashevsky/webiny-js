import type { AcoModel } from "~/types.js";
import { createListQuery } from "@webiny/app-headless-cms-common";

export const createListRecords = (model: AcoModel, fieldIds: string[]) => {
    /**
     * We will include only the simplest fields.
     * TODO: remove default fields in a future release, as field selection will be injected by ACO configs.
     */
    const defaultFields = model.fields.filter(field => {
        return ["text", "number", "boolean", "file", "long-text", "ref", "datetime"].includes(
            field.type
        );
    });

    const additionalFields = model.fields.filter(field => {
        return fieldIds.includes(field.fieldId);
    });

    const uniqueFields = [
        ...new Map(
            [...defaultFields, ...additionalFields].map(field => [field.fieldId, field])
        ).values()
    ];

    return createListQuery(model, uniqueFields);
};
