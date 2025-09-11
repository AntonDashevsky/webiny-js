import type { Request } from "@webiny/handler/types";
import type { AssetRequest } from "~/delivery";

export interface AssetRequestResolver {
    resolve(request: Request): Promise<AssetRequest | undefined>;
}
