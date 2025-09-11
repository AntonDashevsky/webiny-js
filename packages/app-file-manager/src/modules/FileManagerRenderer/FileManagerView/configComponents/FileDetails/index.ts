import type { FieldConfig } from "./Field.js";
import { Field } from "./Field.js";
import { createScopedFieldDecorator } from "./FieldDecorator.js";
import { Width } from "./Width.js";
import { GroupFields } from "./GroupFields.js";
import type { ActionConfig } from "./Action.js";
import { Action } from "./Action.js";
import { ActionButton } from "~/components/FileDetails/components/ActionButton.js";
import type { ThumbnailConfig } from "./Thumbnail.js";
import { Thumbnail } from "./Thumbnail.js";

export interface FileDetailsConfig {
    actions: ActionConfig[];
    thumbnails: ThumbnailConfig[];
    width: string;
    groupFields: boolean;
    fields: FieldConfig[];
}

export const FileDetails = {
    Action: Object.assign(Action, { Button: ActionButton }),
    Preview: {
        Thumbnail
    },
    Width,
    GroupFields,
    Field,
    ExtensionField: {
        createDecorator: createScopedFieldDecorator("fm.fileDetails.extensionFields")
    }
};
