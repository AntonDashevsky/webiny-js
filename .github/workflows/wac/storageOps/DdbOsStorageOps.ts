import { AbstractStorageOps } from "./AbstractStorageOps.js";
import { StorageOpsId } from "./types.js";

export class DdbOsStorageOps extends AbstractStorageOps {
    id = "ddb-os,ddb" as StorageOpsId;
    shortId = "ddbOs";
    displayName = "DynamoDB + OpenSearch";
}
