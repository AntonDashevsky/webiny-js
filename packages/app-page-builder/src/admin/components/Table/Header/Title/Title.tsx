import type { ReactElement } from "react";
import React from "react";

import { Skeleton } from "@webiny/ui/Skeleton";

import { Name } from "./styled";

export interface TitleProps {
    title?: string;
}

export const Title = ({ title }: TitleProps): ReactElement => {
    return (
        <Name use={"headline6"} tag={"h1"}>
            {title || <Skeleton size={"lg"} />}
        </Name>
    );
};
