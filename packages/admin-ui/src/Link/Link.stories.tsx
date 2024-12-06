import type { Meta, StoryObj } from "@storybook/react";

import { Link } from "./Link";

const meta: Meta<typeof Link> = {
    title: "Components/Link",
    component: Link,
    tags: ["autodocs"],
    argTypes: {
        size: { control: "select", options: ["sm", "md", "lg", "xl"] },
        variant: { control: "select", options: ["primary", "secondary"] }
    }
};

export default meta;
type Story = StoryObj<typeof Link>;

export const Default: Story = {
    args: {
        children:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce tempus tortor eu sapien interdum rhoncus."
    }
};

export const LinkXl: Story = {
    args: {
        size: "xl",
        children:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce tempus tortor eu sapien interdum rhoncus."
    }
};

export const LinkLg: Story = {
    args: {
        size: "lg",
        children:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce tempus tortor eu sapien interdum rhoncus."
    }
};

export const LinkMd: Story = {
    args: {
        size: "md",
        children:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce tempus tortor eu sapien interdum rhoncus."
    }
};

export const LinkSm: Story = {
    args: {
        size: "sm",
        children:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce tempus tortor eu sapien interdum rhoncus."
    }
};
