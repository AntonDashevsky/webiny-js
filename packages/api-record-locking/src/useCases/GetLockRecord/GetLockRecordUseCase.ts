import {
    IGetLockRecordUseCase,
    IGetLockRecordUseCaseExecuteParams
} from "~/abstractions/IGetLockRecordUseCase.js";
import { IRecordLockingModelManager, IRecordLockingLockRecord } from "~/types.js";
import { NotFoundError } from "@webiny/handler-graphql";
import { convertEntryToLockRecord } from "~/utils/convertEntryToLockRecord.js";
import { createLockRecordDatabaseId } from "~/utils/lockRecordDatabaseId.js";
import { createIdentifier } from "@webiny/utils";

export interface IGetLockRecordUseCaseParams {
    getManager(): Promise<IRecordLockingModelManager>;
}

export class GetLockRecordUseCase implements IGetLockRecordUseCase {
    private readonly getManager: IGetLockRecordUseCaseParams["getManager"];

    public constructor(params: IGetLockRecordUseCaseParams) {
        this.getManager = params.getManager;
    }

    public async execute(
        input: IGetLockRecordUseCaseExecuteParams
    ): Promise<IRecordLockingLockRecord | null> {
        const recordId = createLockRecordDatabaseId(input.id);
        const id = createIdentifier({
            id: recordId,
            version: 1
        });
        try {
            const manager = await this.getManager();
            const result = await manager.get(id);
            return convertEntryToLockRecord(result);
        } catch (ex) {
            if (ex instanceof NotFoundError) {
                return null;
            }
            throw ex;
        }
    }
}
