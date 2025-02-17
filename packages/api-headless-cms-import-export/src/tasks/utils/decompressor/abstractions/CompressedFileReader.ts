import type { IUnzipperFile } from "~/tasks/utils/decompressor/index.js";

export interface ICompressedFileReader {
    read(target: string): Promise<IUnzipperFile[]>;
}
