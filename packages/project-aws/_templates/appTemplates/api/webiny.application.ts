import { createApiApp } from "@webiny/project-aws";
import { ProjectSdk } from "@webiny/project";
import { ApiPulumi } from "@webiny/project/abstractions";
import { definitions as extensionDefinitions } from "@webiny/extensions/definitions.js";
import { tagResources } from "@webiny/pulumi-aws";

const sdk = await ProjectSdk.init({
    extensions: extensionDefinitions,
    cwd: import.meta.dirname + "/../../../.."
});

const pulumiResourceNamePrefix = await sdk.getPulumiResourceNamePrefix();
const productionEnvironments = await sdk.getProductionEnvironments();

export default createApiApp({
    pulumiResourceNamePrefix,
    productionEnvironments,
    pulumi: async app => {
        const awsTags = await sdk.getAwsTags();
        tagResources(awsTags);

        const pulumiHandlers = sdk.getContainer().resolve(ApiPulumi);
        await pulumiHandlers.execute(app);
    }
});
