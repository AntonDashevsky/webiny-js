import type { Asset, AssetRequest } from "~/delivery/index.js";

export interface AssetResolver {
    resolve(request: AssetRequest): Promise<Asset | undefined>;
}
