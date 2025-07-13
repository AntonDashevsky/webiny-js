import { Button, DropdownMenu } from "@webiny/admin-ui";
import { ReactComponent as ArrowDown } from "@webiny/icons/keyboard_arrow_down.svg";
import { ReactComponent as Draft } from "@webiny/icons/draw.svg";
import React from "react";

const { Item } = DropdownMenu;

export const RevisionsMenu = () => {
    return (
        <DropdownMenu
            trigger={
                <Button
                    variant="ghost"
                    text={"v1 (Draft)"}
                    icon={<ArrowDown />}
                    iconPosition={"end"}
                />
            }
        >
            <Item
                icon={<Item.Icon label={"v1 (Draft)"} element={<Draft />} />}
                text={"v1 (Draft)"}
            />
        </DropdownMenu>
    );
};
