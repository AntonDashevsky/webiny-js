import { CmsModelField } from "../modelField.js";

/**
 * A definition for object field to show possible type of the field in settings.
 */
export interface CmsModelObjectField extends CmsModelField {
    /**
     * Settings object for the field. Contains `templates` property.
     */
    settings: {
        fields: CmsModelField[];
        parents?: string[];
    };
}
