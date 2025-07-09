import React from "react";
import type { ComponentPropsWithChildren } from "~/types";

export const GridColumnComponent = ({
    inputs
}: {
    inputs: ComponentPropsWithChildren["inputs"];
}) => {
    return <>{inputs.children}</>;
};
