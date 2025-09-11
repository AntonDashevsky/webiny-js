import gql from "graphql-tag";
import { ERROR_FIELDS, LOCK_RECORD_FIELDS } from "~/domain/graphql/fields.js";
import type { IRecordLockingError, IRecordLockingLockRecord, IRecordLockingMeta } from "~/types.js";
import type { IRecordLockingListLockRecordsParams } from "~/domain/abstractions/IRecordLockingListLockRecords.js";

export interface IRecordLockingListLockedRecordsVariablesWhere {
    id_in?: string[];
}

export type IRecordLockingListLockedRecordsVariables = IRecordLockingListLockRecordsParams;

export interface IRecordLockingListLockedRecordsResponse {
    recordLocking: {
        listLockRecords: {
            data: IRecordLockingLockRecord[] | null;
            error: IRecordLockingError | null;
            meta: IRecordLockingMeta | null;
        };
    };
}

export const createListLockRecords = () => {
    return gql`
        query RecordLockingListLockedRecords(
            $where: RecordLockingListWhereInput
            $sort: [RecordLockingListSorter!]
            $limit: Int
            $after: String
        ) {
            recordLocking {
                listLockRecords(where: $where, sort: $sort, limit: $limit, after: $after) {
                    data {
                        ${LOCK_RECORD_FIELDS}
                    }
                    error {
                        ${ERROR_FIELDS}
                    }
                }
            }
        }
    `;
};

export const LIST_LOCK_RECORDS = createListLockRecords();
