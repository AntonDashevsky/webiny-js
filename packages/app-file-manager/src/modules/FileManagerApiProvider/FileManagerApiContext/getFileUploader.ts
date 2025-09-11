import { plugins } from "@webiny/plugins";
import type { FileUploaderPlugin } from "@webiny/app/types.js";

export const getFileUploader = (): FileUploaderPlugin => {
    const fileStoragePlugin = plugins.byName<FileUploaderPlugin>("file-uploader");

    if (!fileStoragePlugin) {
        throw Error('Missing plugin: "file-uploader".');
    }

    return fileStoragePlugin;
};
