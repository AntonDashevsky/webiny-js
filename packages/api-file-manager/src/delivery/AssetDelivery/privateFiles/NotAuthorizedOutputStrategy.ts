import { AssetOutputStrategy, AssetReply } from "~/delivery/index.js";
import { NotAuthorizedAssetReply } from "./NotAuthorizedAssetReply.js";

export class NotAuthorizedOutputStrategy implements AssetOutputStrategy {
    async output(): Promise<AssetReply> {
        return new NotAuthorizedAssetReply();
    }
}
