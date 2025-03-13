import type { Meta, StoryObj } from "@storybook/react";
import { ReactComponent as KeyboardArrowRightIcon } from "@material-design-icons/svg/outlined/keyboard_arrow_down.svg";
import { HeaderBar } from "./HeaderBar";
import React from "react";
import { Button, IconButton } from "~/Button";
import { Avatar } from "~/Avatar";

const meta: Meta<typeof HeaderBar> = {
    title: "Components/HeaderBar",
    component: HeaderBar,
    argTypes: {},
    decorators: [
        Story => (
            <div className="wby-bg-[#f4f4f4] wby-h-[500px] wby-w-[1000px]  wby-rounded-[5px] wby-px-[50px] wby-content-center">
                <Story />
            </div>
        )
    ]
};

export default meta;

type Story = StoryObj<typeof HeaderBar>;

export const Default: Story = {
    args: {
        right: (
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
                        image={<Avatar.Image src={"https://i.pravatar.cc/300"} />}
                        fallback={<Avatar.Fallback delayMs={0}>W</Avatar.Fallback>}
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
        )
    }
};
