import {
    type AssetOutputStrategy,
    type Asset,
    type AssetReply,
    type AssetRequest,
    type AssetOutputStrategyDecoratorParams
} from "~/delivery/index.js";
import { type FileManagerContext } from "~/types.js";
import { type ResponseHeaders } from "@webiny/handler";

export interface ResponseHeadersParams {
    headers: ResponseHeaders;
    context: FileManagerContext;
    assetRequest: AssetRequest;
    asset: Asset;
}

export interface ResponseHeadersSetter {
    (params: ResponseHeadersParams): Promise<void> | void;
}

export class SetResponseHeaders implements AssetOutputStrategy {
    private readonly setter: ResponseHeadersSetter;
    private strategyDecoratorParams: AssetOutputStrategyDecoratorParams;

    constructor(
        setter: ResponseHeadersSetter,
        strategyDecoratorParams: AssetOutputStrategyDecoratorParams
    ) {
        this.strategyDecoratorParams = strategyDecoratorParams;
        this.setter = setter;
    }

    async output(asset: Asset): Promise<AssetReply> {
        const reply = await this.strategyDecoratorParams.assetOutputStrategy.output(asset);

        await this.setter({
            asset: this.strategyDecoratorParams.asset,
            assetRequest: this.strategyDecoratorParams.assetRequest,
            context: this.strategyDecoratorParams.context,
            headers: reply.getHeaders()
        });

        return reply;
    }
}
