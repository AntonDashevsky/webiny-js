import type { FieldRendererConfig } from "./FieldRenderer";
import { FieldRenderer } from "./FieldRenderer";

export interface AdvancedSearchConfig {
    fieldRenderers: FieldRendererConfig[];
}

export const AdvancedSearch = {
    FieldRenderer
};
