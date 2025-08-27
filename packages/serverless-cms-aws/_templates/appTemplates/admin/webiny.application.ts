import { createAdminApp } from "@webiny/serverless-cms-aws";
import { ProjectSdk } from "@webiny/project";
import { AdminPulumi } from "@webiny/project/abstractions";
import { definitions as extensionDefinitions } from "@webiny/extensions/definitions.js";
import { tagResources } from "@webiny/pulumi-aws";

const sdk = await ProjectSdk.init({
    extensions: extensionDefinitions,
    cwd: import.meta.dirname + "/../../../.."
});

const pulumiResourceNamePrefix = await sdk.getPulumiResourceNamePrefix();

const productionEnvironments = await sdk.getProductionEnvironments();

export default createAdminApp({
    pulumiResourceNamePrefix,
    productionEnvironments,
    pulumi: async app => {
        const awsTags = await sdk.getAwsTags();
        tagResources(awsTags);

        const pulumiHandlers = sdk.getContainer().resolve(AdminPulumi);
        await pulumiHandlers.execute(app);
    }
});
