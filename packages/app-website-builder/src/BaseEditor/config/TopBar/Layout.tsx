import React from "react";
import { makeDecoratable } from "@webiny/app-admin";
import { HeaderBar } from "@webiny/admin-ui";
import { TopBar } from "./TopBar.js";

export const Layout = makeDecoratable("TopBarLayout", () => {
    return (
        <HeaderBar
            data-role={"top-bar-layout"}
            start={<TopBar.Elements group={"left"} />}
            middle={<TopBar.Elements group={"center"} />}
            end={
                <div className={"wby-flex wby-gap-x-sm"}>
                    <TopBar.Elements group={"actions"} />
                </div>
            }
        />
    );
});
