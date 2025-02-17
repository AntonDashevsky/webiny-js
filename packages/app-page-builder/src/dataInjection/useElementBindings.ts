import { useDynamicDocument } from "./useDynamicDocument.js";

export const useElementBindings = (elementId: string) => {
    const { dataBindings } = useDynamicDocument();

    return {
        bindings: dataBindings.filter(binding => binding.bindTo.startsWith(`element:${elementId}`))
    };
};
