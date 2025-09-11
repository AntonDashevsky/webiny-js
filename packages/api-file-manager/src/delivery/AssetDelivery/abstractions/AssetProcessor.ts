import type { Asset, AssetRequest } from "~/delivery/index.js";

export interface AssetProcessor {
    process(assetRequest: AssetRequest, asset: Asset): Promise<Asset>;
}
