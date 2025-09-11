import type { Asset, AssetProcessor, AssetRequest } from "~/delivery/index.js";

export class PassthroughAssetProcessor implements AssetProcessor {
    process(assetRequest: AssetRequest, asset: Asset): Promise<Asset> {
        return Promise.resolve(asset);
    }
}
