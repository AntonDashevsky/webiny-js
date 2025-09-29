import { AbstractStorageOps } from "./AbstractStorageOps.js";

export class DdbEsStorageOps extends AbstractStorageOps {
    id = "ddb-es,ddb" as const;
    shortId = "ddbEs";
    displayName = "DynamoDB + ElasticSearch";
}
