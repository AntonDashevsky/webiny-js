import { IProjectConfigModel } from "@webiny/project/abstractions/models";
import { awsTags as awsTagsExt } from "~/extensions/awsTags";

export const getAwsTagsFromExtension = (projectConfig: IProjectConfigModel) => {
    const awsTags: Record<string, string> = {};
    projectConfig.extensionsByType(awsTagsExt).forEach(ext => {
        Object.assign(awsTags, ext.params.tags);
    });

    return awsTags;
};
