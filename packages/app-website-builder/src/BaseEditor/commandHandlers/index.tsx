import React from "react";
import { CreateElement } from "./CreateElement";
import { DeleteElement } from "./DeleteElement";
import { MoveElement } from "./MoveElement";
import { DeselectElement } from "./DeselectElement";
import { SelectElement } from "./SelectElement";

export const CommandHandlers = React.memo(() => {
    return (
        <>
            <CreateElement />
            <DeleteElement />
            <MoveElement />
            <DeselectElement />
            <SelectElement />
        </>
    );
});

CommandHandlers.displayName = "CommandHandlers";
