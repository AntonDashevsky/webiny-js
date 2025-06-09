import { type ApwContentTypes, type ApwContext } from "~/types.js";
import { ApwContentReviewNotification } from "~/ApwContentReviewNotification.js";

interface GetLastContentReviewNotificationPluginParams {
    context: ApwContext;
    type: ApwContentTypes;
}
interface GetLastContentReviewNotificationPlugin {
    (params: GetLastContentReviewNotificationPluginParams):
        | ApwContentReviewNotification
        | undefined;
}
export const getLastContentReviewNotificationPlugin: GetLastContentReviewNotificationPlugin =
    params => {
        const { context, type } = params;
        /**
         * We need the plugin to create the notification text.
         */
        const plugins = context.plugins
            .byType<ApwContentReviewNotification>(ApwContentReviewNotification.type)
            .filter(plugin => {
                return plugin.canUse(type);
            });

        return plugins.shift();
    };
