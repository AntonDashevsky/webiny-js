import * as React from "react";
import type { LinkComponent } from "~/types";

export const DefaultLinkComponent: LinkComponent = props => {
    return <a rel={"noreferrer"} {...props} />;
};
