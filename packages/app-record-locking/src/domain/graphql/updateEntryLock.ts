import gql from "graphql-tag";
import { ERROR_FIELDS, LOCK_RECORD_FIELDS } from "./fields.js";
import type { IRecordLockingError, IRecordLockingLockRecord } from "~/types.js";
import type { IRecordLockingUpdateEntryLockExecuteParams } from "~/domain/abstractions/IRecordLockingUpdateEntryLock.js";

export type IRecordLockingUpdateEntryLockVariables = IRecordLockingUpdateEntryLockExecuteParams;

export interface IRecordLockingUpdateEntryLockResponse {
    recordLocking: {
        updateEntryLock: {
            data: IRecordLockingLockRecord | null;
            error: IRecordLockingError | null;
        };
    };
}

export const UPDATE_ENTRY_LOCK = gql`
    mutation RecordLockingUpdateEntryLock($id: ID!, $type: String!) {
        recordLocking {
            updateEntryLock(id: $id, type: $type) {
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
