import React from "react";
import { CreateElement } from "./CreateElement";
import { DeleteElement } from "./DeleteElement";
import { MoveElement } from "./MoveElement";

export const CommandHandlers = () => {
    return (
        <>
            <CreateElement />
            <DeleteElement />
            <MoveElement />
        </>
    );
};
