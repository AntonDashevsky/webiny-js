import React from "react";
import { Cli } from "@webiny/extensions";

export default function Webiny() {
    return (
        <>
            <Cli.Command name={"my-custom-command"} src={"./extensions/myCustomCommand.ts"} />

            <Cli.CommandDecorator name={"my-command-decorator"} src={"./extensions/myCustomCommandDecorator.ts"} />
            {/*<Project.Telemetry enabled={false}/>*/}
        </>
    );
}
