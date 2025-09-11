import React from "react";
import type { CardProps } from "~/Card/index.js";

type CardFooterProps = Pick<CardProps, "actions">;

const CardFooter = ({ actions }: CardFooterProps) => {
    if (!actions) {
        return null;
    }

    return <div className={"wby-flex wby-justify-end wby-gap-sm"}>{actions}</div>;
};

export { CardFooter, type CardFooterProps };
