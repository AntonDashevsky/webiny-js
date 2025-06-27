import { Button, DropdownMenu, Icon, useToast } from "@webiny/admin-ui";
import { ReactComponent as ArrowDown } from "@webiny/icons/keyboard_arrow_down.svg";
import { ReactComponent as Draft } from "@webiny/icons/draw.svg";
import { ReactComponent as Check } from "@webiny/icons/check.svg";
import React, { useState } from "react";
import { SettingsDialog } from "./SettingsDialog";

const { Item } = DropdownMenu;

export const PageOptionsDropdown = () => {
    const [showDialog, setShowDialog] = useState(false);
    const { showToast } = useToast();
    const publish = () => {
        setTimeout(() => {
            showToast({
                title: "Page was published successfully!",
                icon: <Icon icon={<Check />} label={""} className={"wby-fill-success"} />
            });
        }, 500);
    };

    return (
        <div className={"wby-flex wby-gap-x-sm"}>
            <SettingsDialog
                open={showDialog}
                onClose={() => setShowDialog(false)}
                onSave={() => setShowDialog(false)}
            />
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
            <Button
                variant="secondary"
                text={"Settings"}
                onClick={() => setShowDialog(true)}
            ></Button>
            <Button variant="primary" text={"Publish"} onClick={publish}></Button>
        </div>
    );
};
