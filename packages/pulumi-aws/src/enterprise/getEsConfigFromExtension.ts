import { elasticSearch as elasticSearchExt } from "~/extensions/elasticSearch";
import { CreateCorePulumiAppParams } from "./index.js";
import { IProjectConfigModel } from "@webiny/project/abstractions/models";

export const getEsConfigFromExtension = (projectConfig: IProjectConfigModel) => {
    const [elasticSearchExtension] = projectConfig.extensionsByType(elasticSearchExt);
    if (!elasticSearchExtension) {
        // ElasticSearch not used.
        return undefined;
    }

    const { enabled, domainName, indexPrefix, sharedIndexes } = elasticSearchExtension.params;
    if (enabled === false) {
        return false;
    }

    if (domainName || indexPrefix || sharedIndexes) {
        let elasticSearch: CreateCorePulumiAppParams["elasticSearch"] = {};
        if (domainName) {
            elasticSearch.domainName = domainName;
        }

        if (indexPrefix) {
            elasticSearch.indexPrefix = indexPrefix;
        }

        if (sharedIndexes) {
            elasticSearch.sharedIndexes = sharedIndexes;
        }

        return elasticSearch;
    }

    return true;
};
