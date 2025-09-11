import type { Asset, AssetTransformationStrategy, AssetRequest } from "~/delivery/index.js";

export class PassthroughAssetTransformationStrategy implements AssetTransformationStrategy {
    transform(assetRequest: AssetRequest, asset: Asset): Promise<Asset> {
        return Promise.resolve(asset);
    }
}
