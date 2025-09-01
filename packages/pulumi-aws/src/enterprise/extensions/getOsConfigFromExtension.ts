import { openSearch as openSearchExt } from "../extensions/openSearch";
import { CreateCorePulumiAppParams } from "./index.js";
import { IProjectConfigModel } from "@webiny/project/abstractions/models";

export const getOsConfigFromExtension = (projectConfig: IProjectConfigModel) => {
    const [openSearchExtension] = projectConfig.extensionsByType(openSearchExt);
    if (!openSearchExtension) {
        // OpenSearch not used.
        return undefined;
    }

    const { enabled, domainName, indexPrefix, sharedIndexes } = openSearchExtension.params;
    if (enabled === false) {
        return false;
    }

    if (domainName || indexPrefix || sharedIndexes) {
        let openSearch: CreateCorePulumiAppParams["openSearch"] = {};
        if (domainName) {
            openSearch.domainName = domainName;
        }

        if (indexPrefix) {
            openSearch.indexPrefix = indexPrefix;
        }

        if (sharedIndexes) {
            openSearch.sharedIndexes = sharedIndexes;
        }

        return openSearch;
    }

    return true;
};
