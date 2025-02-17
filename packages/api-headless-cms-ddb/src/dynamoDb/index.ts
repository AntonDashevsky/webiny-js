import { createRichTextStorageTransformPlugin } from "./storage/richText.js";
import { createLongTextStorageTransformPlugin } from "./storage/longText.js";
import { createPlainObjectPathPlugin } from "./path/plainObject.js";
import { createDatetimeTransformValuePlugin } from "./transformValue/datetime.js";
import { createLocationFolderIdPathPlugin } from "~/dynamoDb/path/locationFolderId.js";

export default () => [
    createRichTextStorageTransformPlugin(),
    createLongTextStorageTransformPlugin(),
    createPlainObjectPathPlugin(),
    createLocationFolderIdPathPlugin(),
    createDatetimeTransformValuePlugin()
];
