import { createAdvancedSingleRenderer } from "./detailedReferenceRenderer.js";
import { createAdvancedMultipleRenderer } from "./detailedReferencesRenderer.js";

export const createAdvancedRefRenderer = () => {
    return [createAdvancedSingleRenderer(), createAdvancedMultipleRenderer()];
};
