import gql from "graphql-tag";
import { ERROR_FIELDS, LOCK_RECORD_FIELDS } from "./fields.js";
import type { IRecordLockingError, IRecordLockingLockRecord } from "~/types.js";
import type { IRecordLockingGetLockedEntryLockRecordExecuteParams } from "~/domain/abstractions/IRecordLockingGetLockedEntryLockRecord.js";

export type IRecordLockingGetLockedEntryLockRecordVariables =
    IRecordLockingGetLockedEntryLockRecordExecuteParams;

export interface IRecordLockingGetLockedEntryLockRecordResponse {
    recordLocking: {
        getLockedEntryLockRecord: {
            data: IRecordLockingLockRecord | null;
            error: IRecordLockingError | null;
        };
    };
}

export const GET_LOCKED_ENTRY_LOCK_RECORD_QUERY = gql`
    query RecordLockingGetLockedEntryLockRecord($id: ID!, $type: String!) {
        recordLocking {
            getLockedEntryLockRecord(id: $id, type: $type) {
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
