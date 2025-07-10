import { GenericRecord } from "@webiny/api/types";

export interface ISaveSettingsUseCase {
    execute(name: string, data: GenericRecord<string>): Promise<void>;
}

export interface IGetSettingsUseCase {
    execute<TData extends GenericRecord<string> = GenericRecord<string>>(
        name: string
    ): Promise<TData | undefined>;
}
