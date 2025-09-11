import type { CmsEntry, CmsModel } from "~/types/index.js";

export function getEntryDescription(
    model: Pick<CmsModel, "descriptionFieldId" | "fields">,
    entry: CmsEntry
): string {
    if (!model.descriptionFieldId) {
        return "";
    }
    const field = model.fields.find(f => f.fieldId === model.descriptionFieldId);
    if (!field) {
        return "";
    }
    const descriptionFieldId = field.fieldId;
    return entry.values[descriptionFieldId] || "";
}
