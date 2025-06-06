import { IconButton } from "@webiny/admin-ui";
import { ReactComponent as AddLinkIcon } from "@webiny/icons/add_link.svg";
import { ReactComponent as RemoveLinkIcon } from "@webiny/icons/link_off.svg";
import React from "react";

interface WithBindingToggleProps {
    type: "static" | "expression";
    setBindingType: (value: "static" | "expression") => void;
    children: React.ReactNode;
}

export const WithBindingToggle = ({ setBindingType, type, children }: WithBindingToggleProps) => {
    return (
        <div className={"wby-relative"}>
            <IconButton
                className={"wby-absolute wby-right-0"}
                variant={"ghost"}
                size={"sm"}
                icon={type === "static" ? <AddLinkIcon /> : <RemoveLinkIcon />}
                onClick={() => {
                    setBindingType(type === "static" ? "expression" : "static");
                }}
            />
            {children}
        </div>
    );
};
