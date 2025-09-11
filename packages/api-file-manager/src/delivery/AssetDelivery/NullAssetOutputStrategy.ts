import type { AssetOutputStrategy, AssetReply } from "~/delivery/index.js";
import { NullAssetReply } from "./NullAssetReply.js";

export class NullAssetOutputStrategy implements AssetOutputStrategy {
    async output(): Promise<AssetReply> {
        return new NullAssetReply();
    }
}
