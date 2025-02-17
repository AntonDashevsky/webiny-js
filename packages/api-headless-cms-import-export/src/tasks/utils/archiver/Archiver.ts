import type { IArchiver } from "./abstractions/Archiver.js";
import type { Archiver as BaseArchiver, ArchiverOptions } from "archiver";
import archiver from "archiver";

export interface IArchiverConfig {
    format?: "zip";
    options: ArchiverOptions;
}

export class Archiver implements IArchiver {
    public readonly archiver: BaseArchiver;

    public constructor(config: IArchiverConfig) {
        this.archiver = archiver.create(config.format || "zip", config.options);
    }
}

export const createArchiver = (config: IArchiverConfig): IArchiver => {
    return new Archiver(config);
};
