import { type AssetRequest, type AssetRequestResolver } from "~/delivery/index.js";

export class NullRequestResolver implements AssetRequestResolver {
    resolve(): Promise<AssetRequest | undefined> {
        return Promise.resolve(undefined);
    }
}
