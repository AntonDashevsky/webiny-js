import { type Asset, type AssetReply } from "~/delivery/index.js";

export interface AssetOutputStrategy {
    output(asset: Asset): Promise<AssetReply>;
}
