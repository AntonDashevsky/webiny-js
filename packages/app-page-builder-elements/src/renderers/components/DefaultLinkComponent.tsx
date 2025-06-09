import * as React from "react";
import { type LinkComponent } from "~/types.js";

export const DefaultLinkComponent: LinkComponent = props => {
    return <a rel={"noreferrer"} {...props} />;
};
