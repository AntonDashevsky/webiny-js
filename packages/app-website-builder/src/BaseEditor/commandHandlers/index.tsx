import React from "react";
import { CreateElement } from "./CreateElement.js";
import { DeleteElement } from "./DeleteElement.js";
import { MoveElement } from "./MoveElement.js";
import { DeselectElement } from "./DeselectElement.js";
import { SelectElement } from "./SelectElement.js";
import { HighlightElement } from "./HighlightElement.js";

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
