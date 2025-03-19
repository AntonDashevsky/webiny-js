import React from "react";
import { makeDecoratable } from "~/utils";
import { Separator } from "~/Separator";

interface HeaderBarProps {
    left?: React.ReactNode;
    right?: React.ReactNode;
}

const HeaderBarBase = ({ left, right }: HeaderBarProps) => {
    return (
        <>
            <div
                className={
                    "wby-flex wby-justify-between wby-items-center wby-py-xs-plus wby-px-sm wby-bg-white wby-w-full"
                }
            >
                <div>{left}</div>
                <div>{right}</div>
            </div>
            <Separator margin={"none"} variant={"subtle"} />
        </>
    );
};

const HeaderBar = makeDecoratable("HeaderBar", HeaderBarBase);

export { HeaderBar, type HeaderBarProps };
