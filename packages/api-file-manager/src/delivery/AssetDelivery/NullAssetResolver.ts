import { AssetResolver } from "./abstractions/AssetResolver.js";
import { Asset } from "./Asset.js";

export class NullAssetResolver implements AssetResolver {
    resolve(): Promise<Asset | undefined> {
        return Promise.resolve(undefined);
    }
}
