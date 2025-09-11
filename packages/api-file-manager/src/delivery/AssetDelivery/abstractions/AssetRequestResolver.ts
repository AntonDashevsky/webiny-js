import type { Request } from "@webiny/handler/types.js";
import type { AssetRequest } from "~/delivery/index.js";

export interface AssetRequestResolver {
    resolve(request: Request): Promise<AssetRequest | undefined>;
}
