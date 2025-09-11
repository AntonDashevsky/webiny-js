import type { File } from "~/types";

export interface AssetAuthorizer {
    authorize(file: File): Promise<void>;
}
