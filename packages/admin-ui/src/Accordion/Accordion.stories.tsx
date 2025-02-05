import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Accordion, type AccordionItemProps as BaseAccordionItemProps } from "./Accordion";

import { ReactComponent as WarningIcon } from "@material-design-icons/svg/outlined/warning_amber.svg";
import { ReactComponent as ArrowUp } from "@material-design-icons/svg/outlined/arrow_upward.svg";
import { ReactComponent as ArrowDown } from "@material-design-icons/svg/outlined/arrow_downward.svg";
import { ReactComponent as EditIcon } from "@material-design-icons/svg/outlined/edit.svg";
import { ReactComponent as TrashIcon } from "@material-design-icons/svg/outlined/delete.svg";

const meta: Meta<typeof Accordion> = {
    title: "Components/Accordion",
    component: Accordion,
    tags: ["autodocs"],
    argTypes: {}
};

export default meta;

type Story = StoryObj<typeof Accordion>;

interface AccordionItemProps extends Omit<BaseAccordionItemProps, "value" | "title" | "children"> {
    index: number;
}

const AccordionItem = (props: AccordionItemProps) => {
    return (
        <Accordion.Item
            value={`Accordion item ${props.index}`}
            title={`Accordion item ${props.index}`}
            {...props}
        >
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed elit sem, pretium sit amet
            convallis nec, consequat non nulla. Nunc sit amet sagittis tellus. Etiam venenatis, odio
            sed consectetur consectetur, quam quam blandit ante, semper maximus lorem est vel dolor.
            Praesent ac neque rutrum, elementum turpis et, vulputate enim. In ex lorem,
        </Accordion.Item>
    );
};

export const Default: Story = {
    decorators: [
        Story => (
            <div className="wby-w-[600px]">
                <Story />
            </div>
        )
    ],
    args: {
        children: (
            <>
                <AccordionItem index={1} />
                <AccordionItem index={2} />
                <AccordionItem index={3} />
            </>
        )
    }
};

export const WithDescriptions: Story = {
    ...Default,
    args: {
        children: (
            <>
                <AccordionItem
                    index={1}
                    description="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
                />
                <AccordionItem
                    index={2}
                    description="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
                />
                <AccordionItem
                    index={3}
                    description="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
                />
            </>
        )
    },
    argTypes: {}
};

export const WithIcon: Story = {
    ...Default,
    args: {
        children: (
            <>
                <AccordionItem
                    index={1}
                    description="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
                    icon={<Accordion.Item.Icon icon={<WarningIcon />} label={"Warning icon"} />}
                />
                <AccordionItem
                    index={2}
                    description="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
                    icon={<Accordion.Item.Icon icon={<WarningIcon />} label={"Warning icon"} />}
                />
            </>
        )
    }
};

export const WithActionsIcon: Story = {
    ...Default,
    args: {
        children: (
            <>
                <AccordionItem
                    index={1}
                    description="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
                    icon={<Accordion.Item.Icon icon={<WarningIcon />} label={"Warning icon"} />}
                    actions={
                        <>
                            <Accordion.Item.Action icon={<ArrowUp />} />
                            <Accordion.Item.Action icon={<ArrowDown />} />
                            <Accordion.Item.Action.Separator />
                            <Accordion.Item.Action icon={<EditIcon />} />
                            <Accordion.Item.Action icon={<TrashIcon />} />
                        </>
                    }
                />
                <AccordionItem
                    index={2}
                    description="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
                    icon={<Accordion.Item.Icon icon={<WarningIcon />} label={"Warning icon"} />}
                    actions={
                        <>
                            <Accordion.Item.Action icon={<ArrowUp />} />
                            <Accordion.Item.Action icon={<ArrowDown />} />
                            <Accordion.Item.Action.Separator />
                            <Accordion.Item.Action icon={<EditIcon />} />
                            <Accordion.Item.Action icon={<TrashIcon />} />
                        </>
                    }
                />
            </>
        )
    }
};

export const WithHandleIcon: Story = {
    ...Default,
    args: {
        children: (
            <>
                <AccordionItem
                    index={1}
                    description="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
                    icon={<Accordion.Item.Icon icon={<WarningIcon />} label={"Warning icon"} />}
                    handle={<Accordion.Item.Handle />}
                />
                <AccordionItem
                    index={2}
                    description="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
                    handle={<Accordion.Item.Handle />}
                />
            </>
        )
    }
};
