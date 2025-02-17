import { CmsContext } from "@webiny/api-headless-cms/types/index.js";
import { createFilterModel } from "~/filter/filter.model.js";
import { createFolderModel } from "~/folder/folder.model.js";
import { createSearchModel } from "~/record/record.model.js";
import { modelFactory } from "~/utils/modelFactory.js";

export const createAcoModels = (context: CmsContext) => {
    /**
     * Create  CmsModel plugins.
     */
    const modelDefinitions = [createFolderModel(), createSearchModel(), createFilterModel()];
    const cmsModelPlugins = modelDefinitions.map(modelDefinition => {
        return modelFactory({
            modelDefinition
        });
    });

    /**
     *  Register them so that they are accessible in cms context
     */
    context.plugins.register([cmsModelPlugins]);
};
