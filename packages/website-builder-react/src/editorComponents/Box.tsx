import React from "react";
import type { ComponentPropsWithChildren } from "~/types";

export const BoxComponent = ({ inputs }: ComponentPropsWithChildren) => {
    return <>{inputs.children}</>;
};
