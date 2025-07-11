import React from "react";
import { Cli } from "@webiny/extensions";

export default function Webiny() {
    return (
        <>
            <Cli.Command name={"my-custom-commander"} src={"./extensions/myCustomCommand.ts"} />
        </>
    );
}
