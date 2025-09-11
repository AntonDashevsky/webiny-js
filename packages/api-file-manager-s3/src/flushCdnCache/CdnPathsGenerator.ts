import type { File } from "@webiny/api-file-manager/types.js";

export class CdnPathsGenerator {
    generate(file: File) {
        return [`/files/${file.key}*`, `/private/${file.key}*`, ...file.aliases];
    }
}
