import React from "react";
import { Cli, Core, Api, Project } from "@webiny/extensions";

export default () => {
    return (
        <>
            <Project.Telemetry enabled={false} />

            {/*Modifying cloud infra via Pulumi.*/}
            <Core.Pulumi src={"./extensions/myCorePulumiHandler.ts"} />
            <Core.Pulumi src={"./extensions/myCorePulumiHandler2.ts"} />

            {/*Applying AWS tags to deployments.*/}
            <Project.AwsTags tags={{ OWNER: "me", PROJECT: "my-project" }} />
            <Project.AwsTags tags={{ OWNER2: "me2", PROJECT2: "my-project-2" }} />

            <Project.PulumiResourceNamePrefix prefix={"myproj-"} />

            <Project.ProductionEnvironments environments={["prod", "production", "staging"]} />

            {/*Adding custom CLI commands.*/}
            <Cli.Command name={"my-custom-command"} src={"./extensions/myCustomCommand.ts"} />

            {/*Hooking into the API deployment and build process.*/}
            <Api.BeforeDeploy src={"./extensions/myApiBeforeDeploy.ts"} />
            <Api.BeforeBuild src={"./extensions/myApiBeforeBuild.ts"} />
            <Api.AfterDeploy src={"./extensions/myApiAfterDeploy.ts"} />
            <Api.AfterBuild src={"./extensions/myApiAfterBuild.ts"} />
        </>
    );
};
