import { WebinyError } from "@webiny/error";
import type {
    IRecordLockingUnlockEntry,
    IRecordLockingUnlockEntryParams,
    IRecordLockingUnlockEntryResult
} from "~/domain/abstractions/IRecordLockingUnlockEntry.js";
import type { IRecordLockingClient } from "./abstractions/IRecordLockingClient.js";
import type {
    RecordLockingUnlockEntryResponse,
    IRecordLockingUnlockEntryVariables
} from "~/domain/graphql/unlockEntry.js";
import { UNLOCK_ENTRY_MUTATION } from "~/domain/graphql/unlockEntry.js";

interface Params {
    client: IRecordLockingClient;
}

export class RecordLockingUnlockEntry implements IRecordLockingUnlockEntry {
    private readonly client: IRecordLockingClient;

    public constructor(params: Params) {
        this.client = params.client;
    }
    public async execute(
        params: IRecordLockingUnlockEntryParams
    ): Promise<IRecordLockingUnlockEntryResult> {
        const result = await this.client.mutation<
            RecordLockingUnlockEntryResponse,
            IRecordLockingUnlockEntryVariables
        >({
            mutation: UNLOCK_ENTRY_MUTATION,
            variables: params
        });
        if (!result.data?.recordLocking?.unlockEntry) {
            throw new WebinyError("No data returned from server.");
        }
        return result.data.recordLocking.unlockEntry;
    }
}
