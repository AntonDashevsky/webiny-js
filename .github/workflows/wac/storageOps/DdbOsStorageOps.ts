import { AbstractStorageOps } from "./AbstractStorageOps.js";

export class DdbOsStorageOps extends AbstractStorageOps {
    id = "ddb-os,ddb" as const;
    shortId = "ddbOs";
    displayName = "DDB+OS";
}
