import type { File } from "~/types.js";

export interface AssetAuthorizer {
    authorize(file: File): Promise<void>;
}
