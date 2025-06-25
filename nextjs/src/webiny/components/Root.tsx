import React from "react";
import type { ComponentPropsWithChildren } from "@webiny/app-website-builder/react";

export const Root = ({ inputs }: ComponentPropsWithChildren) => {
    return <>{inputs.children}</>;
};
