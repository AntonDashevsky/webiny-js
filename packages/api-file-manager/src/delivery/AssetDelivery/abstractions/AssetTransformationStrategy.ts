import { Asset, AssetRequest } from "~/delivery/index.js";

export interface AssetTransformationStrategy {
    transform(assetRequest: AssetRequest, asset: Asset): Promise<Asset>;
}
