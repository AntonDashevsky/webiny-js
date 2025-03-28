import { FolderModelDto } from "./FolderModelDto.js";

export interface IGetFolderModelGateway {
    execute: () => Promise<FolderModelDto>;
}
