import type { AssetResolver } from "./abstractions/AssetResolver.js";
import type { Asset } from "./Asset.js";

export class NullAssetResolver implements AssetResolver {
    resolve(): Promise<Asset | undefined> {
        return Promise.resolve(undefined);
    }
}
