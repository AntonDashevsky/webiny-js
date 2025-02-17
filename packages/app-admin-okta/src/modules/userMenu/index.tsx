import React, { Fragment } from "react";
import {
    AddUserMenuItem,
    UserMenuHandleRenderer,
    Compose,
    Plugins
} from "@webiny/app-serverless-cms";
import { UserInfo } from "~/modules/userMenu/userInfo.js";
import { SignOut } from "~/modules/userMenu/signOut.js";
import { UserImage } from "~/modules/userMenu/userImage.js";
import { ExitTenant } from "~/modules/userMenu/exitTenant.js";

const UserImageHOC = () => {
    return function UserImageHOC() {
        return <UserImage />;
    };
};

export const UserMenuModule = () => {
    return (
        <Fragment>
            <Compose component={UserMenuHandleRenderer} with={UserImageHOC} />
            <Plugins>
                <AddUserMenuItem element={<UserInfo />} />
                <AddUserMenuItem element={<ExitTenant />} />
                <AddUserMenuItem element={<SignOut />} />
            </Plugins>
        </Fragment>
    );
};
