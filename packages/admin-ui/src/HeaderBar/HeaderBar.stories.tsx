import type { Meta, StoryObj } from "@storybook/react";
import { HeaderBar } from "./HeaderBar";
import React from "react";

const meta: Meta<typeof HeaderBar> = {
    title: "Components/HeaderBar",
    component: HeaderBar,
    argTypes: {},
    decorators: [
        Story => (
            <div className="wby-w-[700px]">
                <Story />
            </div>
        )
    ]
};

export default meta;

type Story = StoryObj<typeof HeaderBar>;

export const Default: Story = {
    args: {
        showCloseButton: true,
        children: "This is an headerBar. Play around with different properties to see how it looks."
    },
    argTypes: {
        type: {
            control: "select",
            options: ["info", "success", "warning", "danger"]
        },
        variant: {
            control: "select",
            options: ["strong", "subtle"]
        }
    }
};

export const Info: Story = {
    args: {
        ...Default.args,
        type: "info",
        children: (
            <>
                This type of notification is suitable for general usage where there’s no need for
                accent. And <a href={"#"}>this thing here</a> is a short link.
            </>
        )
    }
};

