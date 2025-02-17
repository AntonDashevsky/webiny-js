import React from "react";
import { ListItem, ListItemGraphic } from "@webiny/ui/List/index.js";
import { Icon } from "@webiny/ui/Icon/index.js";
import { useSecurity } from "@webiny/app-security/hooks/useSecurity.js";
import { ReactComponent as SignOutIcon } from "~/assets/icons/round-lock_open-24px.svg";

export const SignOut = () => {
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
};

export default () => {
    console.log(
        `[DEPRECATED] Import "@webiny/app-admin-users-cognito/plugins/userMenu/signOut" is no longer used!`
    );
    return { type: "dummy" };
};
