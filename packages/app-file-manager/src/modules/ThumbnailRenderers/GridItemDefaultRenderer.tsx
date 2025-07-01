import * as React from "react";
import { ReactComponent as HideImageIcon } from "@webiny/icons/hide_image.svg";

export const GridItemDefaultRenderer = () => {
    return (
        <div className={"wby-fill-neutral-strong"}>
            <HideImageIcon width={48} height={48} />
        </div>
    );
};
