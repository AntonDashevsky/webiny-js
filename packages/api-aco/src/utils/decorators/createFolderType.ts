import { CmsModel } from "@webiny/api-headless-cms/types/index.js";
import { isPageModel } from "./isPageModel.js";

export const createFolderType = (model: CmsModel): "FmFile" | "PbPage" | `cms:${string}` => {
    if (model.modelId === "fmFile") {
        return "FmFile";
    } else if (isPageModel(model)) {
        return "PbPage";
    }
    return `cms:${model.modelId}`;
};
