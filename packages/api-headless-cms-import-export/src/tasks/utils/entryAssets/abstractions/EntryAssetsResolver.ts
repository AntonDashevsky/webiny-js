import type { IAsset } from "./EntryAssets.js";
import type { File } from "@webiny/api-file-manager/types/file.js";

export type IResolvedAsset = Omit<File, "webinyVersion" | "locale" | "tenant">;

export interface IEntryAssetsResolver {
    resolve(input: IAsset[]): Promise<IResolvedAsset[]>;
}
