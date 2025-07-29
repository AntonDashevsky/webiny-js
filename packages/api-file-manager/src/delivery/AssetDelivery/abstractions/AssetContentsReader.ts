import type { Asset } from "~/delivery";

export interface AssetContentsReader {
    read(asset: Asset): Promise<Buffer>;
}
