import { initializeProject } from "@webiny/cli";
import projectApplication from "../webiny.application";

export = async () => {
    await initializeProject();
    return projectApplication.pulumi.run({
        env: "{DEPLOY_ENV}",
        variant: "{DEPLOY_VARIANT}"
    });
};
