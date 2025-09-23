export type StorageOps = "ddb" | "ddb-os,ddb";

export interface AwsProjectParams {
    region: string;
    storageOps: StorageOps;
}
