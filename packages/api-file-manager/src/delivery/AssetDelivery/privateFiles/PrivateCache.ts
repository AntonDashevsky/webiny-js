import * as cacheControlParser from "cache-control-parser";
import { Asset, AssetOutputStrategy, AssetReply } from "~/delivery/index.js";

export class PrivateCache implements AssetOutputStrategy {
    private strategy: AssetOutputStrategy;

    constructor(strategy: AssetOutputStrategy) {
        this.strategy = strategy;
    }

    async output(asset: Asset): Promise<AssetReply> {
        const reply = await this.strategy.output(asset);

        reply.setHeaders(headers => {
            headers.set("cache-control", (value = "") => {
                const cacheControl = cacheControlParser.parse(value);
                cacheControl["private"] = true;
                cacheControl["public"] = false;
                return cacheControlParser.stringify(cacheControl);
            });
            return headers;
        });

        return reply;
    }
}
