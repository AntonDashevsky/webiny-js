import { Plugin } from "@webiny/plugins";
import {
    type AssetRequestResolver,
    type AssetResolver,
    type AssetProcessor,
    type AssetOutputStrategy,
    type AssetRequest,
    type Asset,
    type AssetTransformationStrategy,
    type ResponseHeadersSetter,
    SetResponseHeaders
} from "~/delivery/index.js";
import { type FileManagerContext } from "~/types.js";
import { NullRequestResolver } from "~/delivery/AssetDelivery/NullRequestResolver.js";
import { NullAssetResolver } from "~/delivery/AssetDelivery/NullAssetResolver.js";
import { NullAssetOutputStrategy } from "./NullAssetOutputStrategy.js";
import { TransformationAssetProcessor } from "./transformation/TransformationAssetProcessor.js";
import { PassthroughAssetTransformationStrategy } from "./transformation/PassthroughAssetTransformationStrategy.js";

type Setter<TParams, TReturn> = (params: TParams) => TReturn;

export type AssetRequestResolverDecorator = Setter<
    { assetRequestResolver: AssetRequestResolver },
    AssetRequestResolver
>;

export type AssetResolverDecorator = Setter<{ assetResolver: AssetResolver }, AssetResolver>;

export type AssetProcessorDecorator = Setter<
    { context: FileManagerContext; assetProcessor: AssetProcessor },
    AssetProcessor
>;

export type AssetTransformationDecorator = Setter<
    { context: FileManagerContext; assetTransformationStrategy: AssetTransformationStrategy },
    AssetTransformationStrategy
>;

export interface AssetOutputStrategyDecoratorParams {
    context: FileManagerContext;
    assetRequest: AssetRequest;
    asset: Asset;
    assetOutputStrategy: AssetOutputStrategy;
}

export type AssetOutputStrategyDecorator = Setter<
    AssetOutputStrategyDecoratorParams,
    AssetOutputStrategy
>;

export class AssetDeliveryConfigBuilder {
    private assetRequestResolverDecorators: AssetRequestResolverDecorator[] = [];
    private assetResolverDecorators: AssetResolverDecorator[] = [];
    private assetProcessorDecorators: AssetProcessorDecorator[] = [];
    private assetTransformationStrategyDecorators: AssetTransformationDecorator[] = [];
    private assetOutputStrategyDecorators: AssetOutputStrategyDecorator[] = [];

    setResponseHeaders(setter: ResponseHeadersSetter) {
        this.decorateAssetOutputStrategy(params => {
            return new SetResponseHeaders(setter, params);
        });
    }

    decorateAssetRequestResolver(decorator: AssetRequestResolverDecorator) {
        this.assetRequestResolverDecorators.push(decorator);
    }

    decorateAssetResolver(decorator: AssetResolverDecorator) {
        this.assetResolverDecorators.push(decorator);
    }

    decorateAssetProcessor(decorator: AssetProcessorDecorator) {
        this.assetProcessorDecorators.push(decorator);
    }

    decorateAssetTransformationStrategy(decorator: AssetTransformationDecorator) {
        this.assetTransformationStrategyDecorators.push(decorator);
    }

    decorateAssetOutputStrategy(decorator: AssetOutputStrategyDecorator) {
        this.assetOutputStrategyDecorators.push(decorator);
    }

    /**
     * @internal
     */
    getAssetRequestResolver() {
        return this.assetRequestResolverDecorators.reduce<AssetRequestResolver>(
            (value, decorator) => decorator({ assetRequestResolver: value }),
            new NullRequestResolver()
        );
    }

    /**
     * @internal
     */
    getAssetResolver() {
        return this.assetResolverDecorators.reduce<AssetResolver>(
            (value, decorator) => decorator({ assetResolver: value }),
            new NullAssetResolver()
        );
    }

    /**
     * @internal
     */
    getAssetProcessor(context: FileManagerContext) {
        return this.assetProcessorDecorators.reduce<AssetProcessor>(
            (value, decorator) => decorator({ assetProcessor: value, context }),
            new TransformationAssetProcessor(this.getAssetTransformationStrategy(context))
        );
    }

    getAssetOutputStrategy(context: FileManagerContext, assetRequest: AssetRequest, asset: Asset) {
        return this.assetOutputStrategyDecorators.reduce<AssetOutputStrategy>(
            (value, decorator) => {
                return decorator({ context, assetRequest, asset, assetOutputStrategy: value });
            },
            new NullAssetOutputStrategy()
        );
    }

    getAssetTransformationStrategy(context: FileManagerContext) {
        return this.assetTransformationStrategyDecorators.reduce<AssetTransformationStrategy>(
            (value, decorator) => decorator({ context, assetTransformationStrategy: value }),
            new PassthroughAssetTransformationStrategy()
        );
    }
}

export interface AssetDeliveryConfigModifier {
    (config: AssetDeliveryConfigBuilder): Promise<void> | void;
}

export class AssetDeliveryConfigModifierPlugin extends Plugin {
    public static override type = "fm.config-modifier";
    private readonly cb: AssetDeliveryConfigModifier;

    constructor(cb: AssetDeliveryConfigModifier) {
        super();
        this.cb = cb;
    }

    async buildConfig(configBuilder: AssetDeliveryConfigBuilder): Promise<void> {
        await this.cb(configBuilder);
    }
}

export const createAssetDeliveryConfig = (cb: AssetDeliveryConfigModifier) => {
    return new AssetDeliveryConfigModifierPlugin(cb);
};
