import React from "react";
import type { ComponentPropsWithChildren } from "~/types";

export const RootComponent = ({ inputs }: ComponentPropsWithChildren) => {
    return <>{inputs.children}</>;
};
