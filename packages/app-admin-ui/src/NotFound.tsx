import * as React from "react";
import { NotFound as NotFoundBase } from "@webiny/app-admin";
import notFoundImage from "./NotFound/notFound.svg";
import { Link, Text } from "@webiny/admin-ui";

export const NotFound = NotFoundBase.createDecorator(() => {
    return function NotFound() {
        return (
            <div
                className={
                    "wby-h-full wby-flex wby-flex-col wby-items-center wby-justify-center wby-text-center wby-gap-xs"
                }
            >
                <img
                    width={200}
                    height={200}
                    src={notFoundImage}
                    alt="Not Accessible"
                    className={"wby-mb-xl"}
                />
                <Text>The route is either missing, or you&apos;re not authorized to view it.</Text>
                <Text>Please contact your administrator to report the issue.</Text>
                <Link to="/">Take me back.</Link>
            </div>
        );
    };
});
