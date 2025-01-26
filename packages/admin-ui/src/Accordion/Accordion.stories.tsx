import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Accordion } from "./Accordion";

import { ReactComponent as InfoIcon } from "@material-design-icons/svg/outlined/info.svg";
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

export const Default: Story = {
    args: {
        children: (
            <>
                <Accordion.Item
                    value={"Accordion item 1"}
                    title="Accordion item 1"
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
                >
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed elit sem, pretium
                    sit amet convallis nec, consequat non nulla. Nunc sit amet sagittis tellus.
                    Etiam venenatis, odio sed consectetur consectetur, quam quam blandit ante,
                    semper maximus lorem est vel dolor. Praesent ac neque rutrum, elementum turpis
                    et, vulputate enim. In ex lorem,
                </Accordion.Item>
                <Accordion.Item
                    value={"Accordion item 2"}
                    title="Accordion item 2"
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
                >
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed elit sem, pretium
                    sit amet convallis nec, consequat non nulla. Nunc sit amet sagittis tellus.
                    Etiam venenatis, odio sed consectetur consectetur, quam quam blandit ante,
                    semper maximus lorem est vel dolor. Praesent ac neque rutrum, elementum turpis
                    et, vulputate enim. In ex lorem,
                </Accordion.Item>
            </>
        )
    },
    argTypes: {}
};
