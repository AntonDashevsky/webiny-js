import { AbstractStorageOps } from "./AbstractStorageOps.js";
import { StorageOpsId } from "./types.js";

export class DdbEsStorageOps extends AbstractStorageOps {
    id = "ddb-es,ddb" as StorageOpsId;
    shortId = "ddbEs";
    displayName = "DynamoDB + ElasticSearch";
}
