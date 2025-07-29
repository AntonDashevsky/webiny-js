import type { ReactElement } from "react";
import React from "react";
import { Text, Icon } from "@webiny/admin-ui";

export interface InfoMessageProps {
    message: string;
    icon?: ReactElement;
}

export const InfoMessage = ({ message, icon }: InfoMessageProps) => {
    return (
        <div className={"wby-bg-neutral-dimmed wby-p-md wby-flex wby-flex-col wby-items-center"}>
            {icon && (
                <Icon label="Select an element" size={"lg"} icon={icon} color={"neutral-light"} />
            )}
            <Text size={"md"} className={"wby-text-center wby-text-neutral-dimmed wby-my-sm"}>
                {message}
            </Text>
        </div>
    );
};
