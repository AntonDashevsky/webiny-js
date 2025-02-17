import gql from "graphql-tag";
import { ERROR_FIELDS, LOCK_RECORD_FIELDS } from "./fields.js";
import { IRecordLockingError, IRecordLockingLockRecord } from "~/types.js";
import { IRecordLockingUnlockEntryRequestParams } from "../abstractions/IRecordLockingUnlockEntryRequest.js";

export type IRecordLockingUnlockEntryRequestVariables = IRecordLockingUnlockEntryRequestParams;

export interface IRecordLockingUnlockEntryRequestResponse {
    recordLocking: {
        unlockEntryRequest: {
            data: IRecordLockingLockRecord | null;
            error: IRecordLockingError | null;
        };
    };
}

export const createUnlockEntryRequestGraphQL = () => {
    return gql`
        mutation RecordLockingUnlockEntryRequest($id: ID!, $type: String!) {
            recordLocking {
                unlockEntryRequest(id: $id, type: $type) {
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
