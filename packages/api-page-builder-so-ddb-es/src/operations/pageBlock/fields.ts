import { PageBlockDynamoDbFieldPlugin } from "~/plugins/definitions/PageBlockDynamoDbFieldPlugin.js";

export const createPageBlockDynamoDbFields = (): PageBlockDynamoDbFieldPlugin[] => {
    return [
        new PageBlockDynamoDbFieldPlugin({
            field: "id"
        }),
        new PageBlockDynamoDbFieldPlugin({
            field: "createdOn",
            type: "date"
        }),
        new PageBlockDynamoDbFieldPlugin({
            field: "savedOn",
            type: "date"
        }),
        new PageBlockDynamoDbFieldPlugin({
            field: "createdBy",
            path: "createdBy.id"
        })
    ];
};
