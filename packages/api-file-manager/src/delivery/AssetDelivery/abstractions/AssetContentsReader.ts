import { Asset } from "~/delivery/index.js";

export interface AssetContentsReader {
    read(asset: Asset): Promise<Buffer>;
}
