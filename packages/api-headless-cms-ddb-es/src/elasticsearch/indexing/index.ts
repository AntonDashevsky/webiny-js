import richTextIndexing from "./richTextIndexing.js";
import longTextIndexing from "./longTextIndexing.js";
import defaultFieldIndexing from "./defaultFieldIndexing.js";
import dateTimeIndexing from "./dateTimeIndexing.js";
import numberIndexing from "./numberIndexing.js";
import objectIndexing from "./objectIndexing.js";
import { createJsonIndexing } from "./jsonIndexing.js";

export default () => [
    dateTimeIndexing(),
    richTextIndexing(),
    longTextIndexing(),
    defaultFieldIndexing(),
    numberIndexing(),
    objectIndexing(),
    createJsonIndexing()
];
