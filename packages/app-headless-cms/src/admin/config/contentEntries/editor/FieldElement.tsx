import { createDecoratorFactory } from "@webiny/react-composition";
import { FieldElement as FieldElementComponent } from "~/admin/components/ContentEntryForm/FieldElement.js";
import { useModel } from "~/admin/components/ModelProvider/index.js";

const createDecorator = createDecoratorFactory<{ modelIds?: string[] }>()(
    FieldElementComponent,
    decoratorProps => {
        const { model } = useModel();

        if (decoratorProps?.modelIds?.length && !decoratorProps.modelIds.includes(model.modelId)) {
            return false;
        }

        return true;
    }
);

export const FieldElement = {
    createDecorator
};
