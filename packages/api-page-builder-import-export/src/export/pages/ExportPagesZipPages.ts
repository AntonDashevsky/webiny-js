import { type IExportPagesZipPagesTaskParams } from "~/export/pages/types.js";
import { type ITaskResponseResult } from "@webiny/tasks";
import { ZipPages } from "./zipPages/ZipPages.js";

export class ExportPagesZipPages {
    public async execute(params: IExportPagesZipPagesTaskParams): Promise<ITaskResponseResult> {
        const { isAborted, response } = params;
        if (isAborted()) {
            return response.aborted();
        }

        const zipPages = new ZipPages();
        return await zipPages.execute(params);
    }
}
