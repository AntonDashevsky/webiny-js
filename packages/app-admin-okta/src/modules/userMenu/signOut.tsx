import React from "react";
import { makeDecoratable } from "@webiny/app-serverless-cms";
import { ListItem, ListItemGraphic } from "@webiny/ui/List/index.js";
import { Icon } from "@webiny/ui/Icon/index.js";
import { useSecurity } from "@webiny/app-security/hooks/useSecurity.js";
import { ReactComponent as SignOutIcon } from "~/assets/icons/round-lock_open-24px.svg";

export const SignOut = makeDecoratable("SignOut", () => {
    const { identity } = useSecurity();

    if (!identity) {
        return null;
    }

    if (typeof identity.logout !== "function") {
        console.warn(`Missing "logout" function implementation in SecurityIdentity!`);
        return null;
    }

    return (
        <ListItem onClick={identity.logout}>
            <ListItemGraphic>{<Icon icon={<SignOutIcon />} />}</ListItemGraphic>
            Sign out
        </ListItem>
    );
});
