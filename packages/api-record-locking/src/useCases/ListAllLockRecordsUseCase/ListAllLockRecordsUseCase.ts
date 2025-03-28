import type {
    IListAllLockRecordsUseCase,
    IListAllLockRecordsUseCaseExecuteParams,
    IListAllLockRecordsUseCaseExecuteResponse
} from "~/abstractions/IListAllLockRecordsUseCase.js";
import type { IRecordLockingModelManager } from "~/types.js";
import { convertWhereCondition } from "~/utils/convertWhereCondition.js";
import type { ConvertEntryToLockRecordCb } from "~/useCases/types.js";

export interface IListAllLockRecordsUseCaseParams {
    getManager(): Promise<IRecordLockingModelManager>;
    convert: ConvertEntryToLockRecordCb;
}

export class ListAllLockRecordsUseCase implements IListAllLockRecordsUseCase {
    private readonly getManager: () => Promise<IRecordLockingModelManager>;
    private readonly convert: ConvertEntryToLockRecordCb;

    public constructor(params: IListAllLockRecordsUseCaseParams) {
        this.getManager = params.getManager;
        this.convert = params.convert;
    }
    public async execute(
        input: IListAllLockRecordsUseCaseExecuteParams
    ): Promise<IListAllLockRecordsUseCaseExecuteResponse> {
        try {
            const manager = await this.getManager();
            const params: IListAllLockRecordsUseCaseExecuteParams = {
                ...input,
                where: convertWhereCondition(input.where)
            };

            const [items, meta] = await manager.listLatest(params);
            return {
                items: items.map(item => {
                    return this.convert(item);
                }),
                meta
            };
        } catch (ex) {
            throw ex;
        }
    }
}
