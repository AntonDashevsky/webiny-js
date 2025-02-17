import { TrashBinItem } from "~/Domain/index.js";

export interface IGetRestoredItemUseCase {
    execute: (id: string) => Promise<TrashBinItem | undefined>;
}
