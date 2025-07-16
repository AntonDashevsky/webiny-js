import React from "react";
import { Cli, Api, Project } from "@webiny/extensions";

export default function Webiny() {
    return (
        <>
            <Project.Telemetry enabled={false} />
            <Project.OpenSearch enabled={false} />

            <Project.Deployments.PulumiResourceNamePrefix prefix={"wby-"} />
            <IsEnvironment name={"prod"}>
                <Project.Deployments.PulumiResourceNamePrefix prefix={"wby-prod-"} />
            </IsEnvironment>

            <Project.Deployments.ProductionEnvironments>
                <Project.Deployments.ProductionEnvironment name={"staging"} />
                <Project.Deployments.ProductionEnvironment name={"prod"} />
            </Project.Deployments.ProductionEnvironments>

            <Project.Deployments.AwsTags>
                <Project.Deployments.AwsTags.Tag
                    name={"webiny:project"}
                    value={"my-webiny-project"}
                />
                <Project.Deployments.AwsTags.Tag name={"webiny:environment"} value={"dev"} />
                <Project.Deployments.AwsTags.Tag name={"webiny:region"} value={"us-east-1"} />
            </Project.Deployments.AwsTags>

            <Core.Pulumi src={"./extensions/myCorePulumiHandler.ts"} />

            <Cli.Command name={"my-custom-command"} src={"./extensions/myCustomCommand.ts"} />
            <Api.BeforeDeploy
                name={"my-api-before-deploy"}
                src={"./extensions/myApiBeforeDeploy.ts"}
            />
            <Api.BeforeBuild
                name={"my-api-before-build"}
                src={"./extensions/myApiBeforeBuild.ts"}
            />
            <Api.AfterDeploy
                name={"my-api-after-deploy"}
                src={"./extensions/myApiAfterDeploy.ts"}
            />
            <Api.AfterBuild name={"my-api-after-build"} src={"./extensions/myApiAfterBuild.ts"} />
        </>
    );
}
