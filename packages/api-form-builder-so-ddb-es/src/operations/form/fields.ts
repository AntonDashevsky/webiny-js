import { FormDynamoDbFieldPlugin } from "~/plugins/FormDynamoDbFieldPlugin.js";

export default () => [
    new FormDynamoDbFieldPlugin({
        field: "publishedOn",
        type: "date"
    })
];
