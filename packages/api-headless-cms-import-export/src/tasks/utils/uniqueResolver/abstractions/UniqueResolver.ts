import type { GenericRecord } from "@webiny/api/types.js";

export interface IUniqueResolver<T extends GenericRecord> {
    resolve(assets: T[], field: keyof T): T[];
}
