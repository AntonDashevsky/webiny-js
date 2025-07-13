import React from "react";
import { Cli, Api } from "@webiny/extensions";

export default function Webiny() {
    return (
        <>
            {/*<Cli.Command name={"my-custom-command"} src={"./extensions/myCustomCommand.ts"} />*/}

            <Api.BeforeDeploy name={'my-api-before-deploy'} src={'./extensions/myApiBeforeDeploy.ts'} />
            <Api.BeforeBuild name={'my-api-before-build'} src={'./extensions/myApiBeforeBuild.ts'} />
            {/*<Project.Telemetry enabled={false}/>*/}
        </>
    );
}
