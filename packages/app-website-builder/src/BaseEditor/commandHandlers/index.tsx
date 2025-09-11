import React from "react";
import { CreateElement } from "./CreateElement";
import { DeleteElement } from "./DeleteElement";
import { MoveElement } from "./MoveElement";
import { DeselectElement } from "./DeselectElement";
import { SelectElement } from "./SelectElement";
import { HighlightElement } from "./HighlightElement";

export const CommandHandlers = React.memo(() => {
    return (
        <>
            <CreateElement />
            <DeleteElement />
            <MoveElement />
            <DeselectElement />
            <SelectElement />
            <HighlightElement />
        </>
    );
});

CommandHandlers.displayName = "CommandHandlers";
