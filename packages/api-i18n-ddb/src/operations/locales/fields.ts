import { LocaleDynamoDbFieldPlugin } from "~/plugins/LocaleDynamoDbFieldPlugin.js";

export default () => [
    new LocaleDynamoDbFieldPlugin({
        field: "code"
    }),
    new LocaleDynamoDbFieldPlugin({
        field: "createdOn",
        type: "date"
    }),
    new LocaleDynamoDbFieldPlugin({
        field: "createdBy",
        path: "createdBy.id"
    })
];
