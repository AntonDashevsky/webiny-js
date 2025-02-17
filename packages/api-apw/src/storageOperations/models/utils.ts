import camelCase from "lodash/camelCase.js";
import { CmsModelField } from "@webiny/api-headless-cms/types/index.js";
import { CreateModelFieldParams } from "~/plugins/utils.js";

export const createModelField = (params: CreateModelFieldParams): CmsModelField => {
    const { label, fieldId: initialFieldId, type, parent } = params;
    const fieldId = initialFieldId ? camelCase(initialFieldId) : camelCase(label);
    return {
        id: `${camelCase(parent)}_${fieldId}`,
        storageId: fieldId,
        fieldId,
        label,
        type,
        settings: params.settings || {},
        listValidation: params.listValidation || [],
        validation: params.validation || [],
        multipleValues: params.multipleValues || false,
        predefinedValues: params.predefinedValues || {
            values: [],
            enabled: false
        }
    };
};
