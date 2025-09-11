import type { AssetResolver } from "./abstractions/AssetResolver";
import type { Asset } from "./Asset";

export class NullAssetResolver implements AssetResolver {
    resolve(): Promise<Asset | undefined> {
        return Promise.resolve(undefined);
    }
}
