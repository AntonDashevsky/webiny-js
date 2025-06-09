import * as cacheControlParser from "cache-control-parser";
import { type Asset, type AssetOutputStrategy, type AssetReply } from "~/delivery/index.js";

export class PublicCache implements AssetOutputStrategy {
    private strategy: AssetOutputStrategy;

    constructor(strategy: AssetOutputStrategy) {
        this.strategy = strategy;
    }

    async output(asset: Asset): Promise<AssetReply> {
        const reply = await this.strategy.output(asset);

        reply.setHeaders(headers => {
            headers.set("cache-control", (value = "") => {
                const cacheControl = cacheControlParser.parse(value);
                cacheControl["private"] = false;
                cacheControl["public"] = true;
                return cacheControlParser.stringify(cacheControl);
            });
            return headers;
        });

        return reply;
    }
}
