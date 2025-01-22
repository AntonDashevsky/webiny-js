// This file contains no Tailwind utility classes to modify.
// It only contains story configurations and component usage examples.
// The original code can remain unchanged.

import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Accordion } from "./Accordion";
import { Button } from "~/Button";

const meta: Meta<typeof Accordion> = {
    title: "Components/Accordion",
    component: Accordion,
    tags: ["autodocs"],
    argTypes: {}
};

export default meta;

type Story = StoryObj<typeof Accordion>;

export const Default: Story = {
    args: {
        children: (
            <>
                <Accordion.Item value={'account'} title="Account" icon={<div></div>}>
                    Account content
                </Accordion.Item>                <Accordion.Item value={'account2'} title="Account" icon={<div></div>}>
                    Account content
                </Accordion.Item>
            </>
        )
    },
    argTypes: {}
};
