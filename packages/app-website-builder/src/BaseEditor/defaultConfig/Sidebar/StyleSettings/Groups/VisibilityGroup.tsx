import React from "react";
import { Accordion } from "@webiny/admin-ui";
import { Visibility, type VisibilityProps } from "./Visibility/index.js";

export const VisibilityGroup = ({ elementId }: VisibilityProps) => {
    return (
        <Accordion.Item title={"Visibility"} description={"Set element visibility"}>
            <Visibility elementId={elementId} />
        </Accordion.Item>
    );
};
