import { AbstractStorageOps } from "./AbstractStorageOps.js";
import { StorageOpsId } from "./types.js";

export class DdbStorageOps extends AbstractStorageOps {
    id = "ddb" as StorageOpsId;
    shortId = "ddb";
    displayName = "DynamoDB-only";
}
