import React from "react";
import { makeDecoratable } from "@webiny/react-composition";

type BaseAnchorAttributes = Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, "href">;

export type SimpleLinkProps = BaseAnchorAttributes & {
    to: string;
};

export const SimpleLink = makeDecoratable(
    "SimpleLink",
    ({ children, to, ...rest }: SimpleLinkProps) => {
        return (
            <a href={to} rel="noreferrer noopener" {...rest}>
                {children}
            </a>
        );
    }
);
