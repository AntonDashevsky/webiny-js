/**
 * File is @internal
 */
import { type CmsFieldFilterValueTransformPlugin } from "~/types.js";
import { TimeTransformPlugin } from "@webiny/db-dynamodb/plugins/definitions/TimeTransformPlugin.js";
import { DateTimeTransformPlugin } from "@webiny/db-dynamodb/plugins/definitions/DateTimeTransformPlugin.js";

const timeTransformer = new TimeTransformPlugin({
    fields: ["*"]
});
const dateTimeTransformer = new DateTimeTransformPlugin({
    fields: ["*"]
});

export const createDatetimeTransformValuePlugin = (): CmsFieldFilterValueTransformPlugin => {
    return {
        type: "cms-field-filter-value-transform",
        name: "cms-field-value-filter-transform-datetime",
        fieldType: "datetime",
        /**
         * Always transform into the milliseconds.
         */
        transform: ({ field, value }) => {
            const { type } = field.settings || {};
            if (type === "time") {
                return timeTransformer.transform({
                    value
                });
            }
            return dateTimeTransformer.transform({
                value
            });
        }
    };
};
