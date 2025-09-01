import React from "react";

// Note: in a real project, these would be imported from `@webiny/extensions`
import { Admin, Api, Cli, Core, Project, Webiny } from "./packages/project-aws/dist/index.js";

export default () => {
    return (
        <>
            <Webiny />

            <Project.Id id={"webiny/test-project"} />
            <Project.Telemetry enabled={false} />

            {/*Modifying cloud infra via Pulumi.*/}
            <Core.Pulumi src={"./extensions/myCorePulumiHandler2.ts"} />

            {/*Applying AWS tags to deployments.*/}
            <Project.AwsTags tags={{ OWNER: "me", PROJECT: "my-project" }} />
            <Project.AwsTags tags={{ OWNER2: "me2", PROJECT2: "my-project-2" }} />

            {/*<Project.ElasticSearch enabled={true} />*/}
            <Project.Vpc enabled={false} />

            <Project.PulumiResourceNamePrefix prefix={"myproj-"} />
            <Project.ProductionEnvironments environments={["prod", "staging"]} />

            {/*Adding custom CLI commands.*/}
            <Cli.Command src={"./extensions/myCustomCommand.ts"} />

            <Api.BeforeDeploy src={"./extensions/myApiBeforeDeploy.ts"} />
            <Api.BeforeBuild src={"./extensions/myApiBeforeBuild.ts"} />
            <Api.AfterDeploy src={"./extensions/myApiAfterDeploy.ts"} />
            <Api.AfterBuild src={"./extensions/myApiAfterBuild.ts"} />

            <Admin.Extension src={"./extensions/myAdminExtension.tsx"} />

            <Api.Legacy.ContextPlugin src={"./extensions/myLegacyContextPlugin.ts"} />
            {/*<Api.Cms.OnEntryBeforeCreate src={"./extensions/myOnEntryBeforeCreate.ts"} />*/}
        </>
    );
};
