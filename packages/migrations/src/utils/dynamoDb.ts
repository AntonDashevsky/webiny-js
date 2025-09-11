import type {
    BatchReadItem,
    BatchReadParams,
    BatchWriteItem,
    BatchWriteParams,
    GetRecordParams,
    ScanParams,
    ScanResponse
} from "@webiny/db-dynamodb/utils";
import {
    batchReadAll,
    batchWriteAll,
    get,
    count,
    queryAll,
    queryAllWithCallback as ddbQueryAllWithCallback,
    queryOne,
    scan,
    scanWithCallback as ddbScanWithCallback
} from "@webiny/db-dynamodb/utils/index.js";

export {
    count,
    get,
    queryAll,
    ddbQueryAllWithCallback,
    queryOne,
    batchReadAll,
    batchWriteAll,
    scan,
    ddbScanWithCallback
};
export type {
    GetRecordParams,
    BatchWriteItem,
    BatchWriteParams,
    BatchReadItem,
    BatchReadParams,
    ScanParams,
    ScanResponse
};
