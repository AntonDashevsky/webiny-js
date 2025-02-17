import { CmsErrorResponse, CmsModel } from "~/types.js";
import { IDeleteCmsModelTask } from "~/admin/viewsGraphql.js";

export enum FullyDeleteModelStateStatus {
    NONE = 0,
    UNDERSTOOD = 1,
    CONFIRMED = 2,
    PROCESSED = 3,
    ERROR = 999
}

export interface IFullyDeleteModelState {
    status: FullyDeleteModelStateStatus;
    confirmation: string;
    model: CmsModel | null;
    error: CmsErrorResponse | null;
    task: IDeleteCmsModelTask | null;
}
