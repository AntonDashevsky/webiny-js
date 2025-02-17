import * as React from "react";
import { LinkComponent } from "~/types.js";

export const DefaultLinkComponent: LinkComponent = props => {
    return <a rel={"noreferrer"} {...props} />;
};
