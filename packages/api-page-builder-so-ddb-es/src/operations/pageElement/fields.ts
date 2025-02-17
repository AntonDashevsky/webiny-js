import { PageElementDynamoDbElasticFieldPlugin } from "~/plugins/definitions/PageElementDynamoDbElasticFieldPlugin.js";

export const createPageElementDynamoDbFields = (): PageElementDynamoDbElasticFieldPlugin[] => [
    new PageElementDynamoDbElasticFieldPlugin({
        field: "createdOn",
        type: "date"
    }),
    new PageElementDynamoDbElasticFieldPlugin({
        field: "createdBy",
        path: "createdBy.id",
        sortable: false
    })
];
