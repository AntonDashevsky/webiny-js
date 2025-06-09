import { type Asset, type AssetRequest } from "~/delivery/index.js";

export interface AssetResolver {
    resolve(request: AssetRequest): Promise<Asset | undefined>;
}
