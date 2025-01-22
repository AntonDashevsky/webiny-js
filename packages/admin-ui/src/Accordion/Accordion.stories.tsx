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
                <AccordionItem value="item-1">
                    <AccordionTrigger>Is it accessible?</AccordionTrigger>
                    <AccordionContent>
                        Yes. It adheres to the WAI-ARIA design pattern.
                    </AccordionContent>
                </AccordionItem>
                <AccordionTrigger>Is it styled?</AccordionTrigger>
                <AccordionItem value="item-2">
                    <AccordionContent>
                        Yes. It comes with default styles that matches the other components&apos;
                        aesthetic.
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-3">
                    <AccordionTrigger>Is it animated?</AccordionTrigger>
                    <AccordionContent>
                        Yes. It&apos;s animated by default, but you can disable it if you prefer.
                    </AccordionContent>
                </AccordionItem>
            </>
        )
    },
    argTypes: {}
};
