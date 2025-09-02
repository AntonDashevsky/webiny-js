import * as aws from "@pulumi/aws";
import { type PulumiApp } from "@webiny/pulumi";
import { tagResources } from "~/utils";
import { getEnvVariableWebinyProjectName } from "~/env/projectName";
import { getEnvVariableWebinyEnv } from "~/env/env";
import { getEnvVariableWebinyVariant } from "~/env/variant";
import { AppName, getProjectSdk } from "@webiny/project";
import { awsTags as awsTagsExt } from "~/extensions/awsTags";

export function getAwsAccountId(app: PulumiApp) {
    return app.addHandler(() => {
        return aws.getCallerIdentity({}).then(x => x.accountId);
    });
}

export function getAwsRegion(app: PulumiApp) {
    return app.addHandler(() => {
        return aws.config.requireRegion();
    });
}

export async function applyAwsResourceTags(appName: AppName) {
    const sdk = await getProjectSdk();
    const projectConfig = await sdk.getProjectConfig();

    const awsTagsFromExtensions: Record<string, string> = {};
    projectConfig.extensionsByType(awsTagsExt).forEach(ext => {
        Object.assign(awsTagsFromExtensions, ext.params.tags);
    });

    tagResources({
        ...awsTagsFromExtensions,
        WbyApp: appName,
        WbyProjectName: getEnvVariableWebinyProjectName(),
        WbyEnvironment: getEnvVariableWebinyEnv(),
        WbyEnvironmentVariant: getEnvVariableWebinyVariant()
    });
}
