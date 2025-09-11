import type { FieldConfig } from "./Field";
import { Field } from "./Field";
import { createScopedFieldDecorator } from "./FieldDecorator";
import { Width } from "./Width";
import { GroupFields } from "./GroupFields";
import type { ActionConfig } from "./Action";
import { Action } from "./Action";
import { ActionButton } from "~/components/FileDetails/components/ActionButton";
import type { ThumbnailConfig } from "./Thumbnail";
import { Thumbnail } from "./Thumbnail";

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
