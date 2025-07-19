import React, { useEffect, useState } from "react";
import { mouseTracker } from "@webiny/website-builder-sdk";

export const MouseStatus = () => {
    const [position, setPosition] = useState({ x: 0, y: 0 });

    useEffect(() => {
        return mouseTracker.subscribe(setPosition);
    }, []);

    return (
        <div className={"wby-absolute wby-bottom-0 wby-left-0 wby-p-md"}>
            {position.x}:{position.y}
        </div>
    );
};
