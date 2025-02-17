import { CmsModelField } from "~/types/index.js";

export const getBaseFieldType = (field: Pick<CmsModelField, "type">) => {
    return field.type.split(":")[0];
};
