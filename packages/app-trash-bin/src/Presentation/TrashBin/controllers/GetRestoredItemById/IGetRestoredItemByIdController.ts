import { type TrashBinItemDTO } from "~/Domain/index.js";

export interface IGetRestoredItemByIdController {
    execute(id: string): Promise<TrashBinItemDTO | undefined>;
}
