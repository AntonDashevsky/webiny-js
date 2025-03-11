import React from "react";
import Helmet from "react-helmet";
import { Compose, LayoutProps, LayoutRenderer, Navigation } from "@webiny/app-admin";
import { Avatar, Button, IconButton, Separator } from "@webiny/admin-ui";
import { useSecurity } from "@webiny/app-security";
import { ReactComponent as KeyboardArrowRightIcon } from "@material-design-icons/svg/outlined/keyboard_arrow_down.svg";
import { HeaderBar } from "@webiny/admin-ui";

const RMWCLayout = () => {
    return function RMWCLayout({ title, children }: LayoutProps) {
        const { identity } = useSecurity();

        return (
            <>
                {title ? <Helmet title={title} /> : null}
                <Navigation />

                <div className={"wby-w-full"}>
                    <HeaderBar
                        right={
                            <div className={"wby-flex wby-gap-x-sm"}>
                                <Button variant={"ghost"} size={"md"} text={"Root tenant"} />
                                <div
                                    className={
                                        "wby-flex wby-items-center wby-rounded-md wby-gap-xxs wby-py-xs wby-px-xs wby-bg-neutral-light"
                                    }
                                >
                                    <Avatar
                                        size={"sm"}
                                        variant={"strong"}
                                        image={
                                            <Avatar.Image src={identity!.profile?.avatar?.src} />
                                        }
                                        fallback={
                                            <Avatar.Fallback
                                                className={"wby-uppercase"}
                                                delayMs={0}
                                            >
                                                {identity!.displayName[0]}
                                            </Avatar.Fallback>
                                        }
                                    />
                                    <IconButton
                                        variant={"ghost"}
                                        size={"xs"}
                                        color={"neutral-strong"}
                                        icon={<KeyboardArrowRightIcon />}
                                        onClick={() => console.log("clicked")}
                                    />
                                </div>
                            </div>
                        }
                    />
                    {children}
                </div>
            </>
        );
    };
};

export const Layout = () => {
    return <Compose component={LayoutRenderer} with={RMWCLayout} />;
};
