import { Field, FieldConfig } from "./Field.js";
import { createScopedFieldDecorator } from "./FieldDecorator.js";
import { Width } from "./Width.js";
import { GroupFields } from "./GroupFields.js";
import { Action, ActionConfig } from "./Action.js";
import { ActionButton } from "~/components/FileDetails/components/ActionButton.js";
import { Thumbnail, ThumbnailConfig } from "./Thumbnail.js";

export interface FileDetailsConfig {
    actions: ActionConfig[];
    thumbnails: ThumbnailConfig[];
    width: string;
    groupFields: boolean;
    fields: FieldConfig[];
}

export const FileDetails = {
    Action: Object.assign(Action, { IconButton: ActionButton }),
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
