import type { Meta, StoryObj } from "@storybook/react";
import { Sidebar } from "./Sidebar";
import React from "react";
import { Button } from "~/Button";

import { ReactComponent as CreditCard } from "@material-design-icons/svg/outlined/credit_score.svg";
import { ReactComponent as Settings } from "@material-design-icons/svg/outlined/settings.svg";
import { ReactComponent as User } from "@material-design-icons/svg/outlined/person.svg";
import { ReactComponent as Keyboard } from "@material-design-icons/svg/outlined/keyboard.svg";

const meta: Meta<typeof Sidebar> = {
    title: "Components/Sidebar",
    component: Sidebar,
    tags: ["autodocs"],
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

type Story = StoryObj<typeof Sidebar>;

export const Default: Story = {
    args: {
        trigger: <Button variant="primary" text={"Open"} />,
        children: (
            <>
                <Sidebar.Item icon={<User />} content={"Profile"} />
                <Sidebar.Group>
                    <Sidebar.Item icon={<CreditCard />} content={"Billing"} />
                    <Sidebar.Item icon={<Settings />} content={"Settings"} />
                    <Sidebar.Item icon={<Keyboard />} content={"Keyboard shortcuts"} />
                </Sidebar.Group>
            </>
        )
    }
};


// <DropdownMenu>
//     <DropdownMenu.Label content={"My Account"} />
//     <DropdownMenu.Item icon={<User />} content={"Profile"} />
//     <DropdownMenu.Group>
//         <DropdownMenu.Item icon={<CreditCard />} content={"Billing"} />
//         <DropdownMenu.Item icon={<Settings />} content={"Settings"} />
//         <DropdownMenu.Item icon={<Keyboard />} content={"Keyboard shortcuts"} />
//     </DropdownMenu.Group>
//     <DropdownMenu.Separator />
//     <DropdownMenu.Group>
//         <DropdownMenu.Item icon={<Users />} content={"Team"} />
//         <DropdownMenu.Item icon={<UserPlus />} content={"Invite users"}>
//             <DropdownMenu.Item icon={<Mail />} content={"Email"} />
//             <DropdownMenu.Item icon={<MessageSquare />} content={"Message"} />
//             <DropdownMenu.Separator />
//             <DropdownMenu.Item icon={<PlusCircle />} content={"More..."}>
//                 {/* These will be show in a submenu, once the user hovers over the "More..." item */}
//                 <DropdownMenu.Item icon={<Mail />} content={"Email"} />
//                 <DropdownMenu.Item icon={<MessageSquare />} content={"Message"} />
//                 <DropdownMenu.Separator />
//                 <DropdownMenu.Item icon={<PlusCircle />} content={"More..."} />
//             </DropdownMenu.Item>
//         </DropdownMenu.Item>
//         <DropdownMenu.Item icon={<Plus />} content={"New Team"} />
//     </DropdownMenu.Group>
//     <DropdownMenu.Separator />
//     <DropdownMenu.Item icon={<LifeBuoy />} content={"Support"} />
//     <DropdownMenu.Item icon={<Cloud />} content={"API"} disabled />
//     <DropdownMenu.Separator />
//     <DropdownMenu.Item icon={<LogOut />} content={"Log out"} />
// </DropdownMenu>;
