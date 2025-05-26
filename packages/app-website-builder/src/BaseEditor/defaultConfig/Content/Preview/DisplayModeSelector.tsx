import React from "react";
import classNames from "classnames";
import { IconButton, Tooltip, Text, Heading } from "@webiny/admin-ui";
import { useDisplayMode } from "~/BaseEditor/hooks/useDisplayMode";

export const DisplayModeSelector = () => {
    const { displayMode, displayModes, setDisplayMode } = useDisplayMode();

    return (
        <div className={"wby-align-right wby-bg-neutral-light wby-rounded-md"}>
            {displayModes.map(mode => {
                return (
                    <Tooltip
                        key={mode.name}
                        content={
                            <div>
                                <Heading level={5}>{mode.title}</Heading>
                                <Text size="md">{mode.description}</Text>
                            </div>
                        }
                        side="bottom"
                        className={classNames("action-wrapper", {
                            active: mode === displayMode
                        })}
                        trigger={
                            <IconButton
                                size={"md"}
                                icon={mode.icon}
                                variant={displayMode.name === mode.name ? "tertiary" : "ghost"}
                                onClick={() => setDisplayMode(mode.name)}
                            />
                        }
                    />
                );
            })}
        </div>
    );
};
