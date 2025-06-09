import upperFirst from "lodash/upperFirst.js";
import camelCase from "lodash/camelCase.js";
import { type CmsDynamicZoneTemplate } from "@webiny/app-headless-cms-common/types/index.js";
import { useParentField } from "~/admin/components/ContentEntryForm/ParentValue.js";
import { useModelField } from "~/admin/components/ModelFieldProvider/index.js";
import { useModel } from "~/admin/components/ModelProvider/index.js";

const createTypeName = (modelId: string): string => {
    return upperFirst(camelCase(modelId));
};

export const useTemplateTypename = () => {
    const { model } = useModel();
    const { field } = useModelField();
    const parent = useParentField();

    const getFullTypename = (template: CmsDynamicZoneTemplate) => {
        let currentParent = parent;
        const parents: string[] = [];
        while (currentParent) {
            parents.push(createTypeName(currentParent.field.fieldId));

            currentParent = currentParent.getParentField(0);
        }

        return [
            model.singularApiName,
            ...parents.reverse(),
            createTypeName(field.fieldId),
            template.gqlTypeName
        ].join("_");
    };

    return { getFullTypename };
};
