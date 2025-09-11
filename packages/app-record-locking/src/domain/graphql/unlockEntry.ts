import gql from "graphql-tag";
import { ERROR_FIELDS, LOCK_RECORD_FIELDS } from "./fields.js";
import type { IRecordLockingError, IRecordLockingLockRecord } from "~/types.js";
import type { IRecordLockingUnlockEntryParams } from "../abstractions/IRecordLockingUnlockEntry.js";

export type IRecordLockingUnlockEntryVariables = IRecordLockingUnlockEntryParams;

export interface RecordLockingUnlockEntryResponse {
    recordLocking: {
        unlockEntry: {
            data: IRecordLockingLockRecord | null;
            error: IRecordLockingError | null;
        };
    };
}

export const UNLOCK_ENTRY_MUTATION = gql`
    mutation RecordLockingUnlockEntry($id: ID!, $type: String!, $force: Boolean) {
        recordLocking {
            unlockEntry(id: $id, type: $type, force: $force) {
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
