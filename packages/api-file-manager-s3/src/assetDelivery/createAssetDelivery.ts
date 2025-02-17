import { createAssetDeliveryPluginLoader } from "@webiny/api-file-manager";
import { PluginFactory } from "@webiny/plugins/types.js";
import type { AssetDeliveryParams } from "./assetDeliveryConfig.js";

export const createAssetDelivery = (params: AssetDeliveryParams): PluginFactory => {
    /**
     * We only want to load this plugin in the context of the Asset Delivery Lambda function.
     */
    return createAssetDeliveryPluginLoader(() => {
        return import(/* webpackChunkName: "s3AssetDelivery" */ "./assetDeliveryConfig.js").then(
            ({ assetDeliveryConfig }) => assetDeliveryConfig(params)
        );
    });
};
