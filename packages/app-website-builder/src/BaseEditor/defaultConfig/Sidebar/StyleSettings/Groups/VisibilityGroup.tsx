import React from "react";
import { Accordion } from "@webiny/admin-ui";
import { Visibility, type VisibilityProps } from "./Visibility/index";

export const VisibilityGroup = ({ elementId }: VisibilityProps) => {
    return (
        <Accordion.Item title={"Visibility"}>
            <Visibility elementId={elementId} />
        </Accordion.Item>
    );
};
