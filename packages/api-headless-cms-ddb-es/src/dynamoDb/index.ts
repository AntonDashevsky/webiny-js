import { createRichTextStorageTransformPlugin } from "./storage/richText.js";
import { createLongTextStorageTransformPlugin } from "./storage/longText.js";

export default () => createDynamoDbPlugins();

export const createDynamoDbPlugins = () => {
    return [createRichTextStorageTransformPlugin(), createLongTextStorageTransformPlugin()];
};
