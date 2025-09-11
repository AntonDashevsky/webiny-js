import type { FolderModelDto } from "./FolderModelDto.js";

export interface IGetFolderModelRepository {
    load: () => Promise<void>;
    getModel: () => FolderModelDto | undefined;
    hasModel: () => boolean;
}
