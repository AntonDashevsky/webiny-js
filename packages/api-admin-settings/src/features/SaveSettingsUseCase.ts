import type { Context, GenericRecord } from "@webiny/api/types";
import type { ISaveSettingsUseCase } from "~/types";

export class SaveSettingsUseCase implements ISaveSettingsUseCase {
    constructor(context: Context) {
        // context.db.driver.documentClient
    }

    execute(name: string, data: GenericRecord<string>): Promise<void> {
        return Promise.resolve(undefined);
    }
}
