import React, { useEffect, useCallback, type ReactElement } from "react";
import { IconButton } from "@webiny/ui/Button/index.js";
import { Tooltip } from "@webiny/ui/Tooltip/index.js";
import { useKeyHandler } from "~/editor/hooks/useKeyHandler.js";

interface ActionProps {
    disabled?: boolean;
    icon?: ReactElement;
    tooltip?: string;
    onClick?: () => void;
    shortcut?: string[];
    // For testing purposes.
    "data-testid"?: string;
}

const Action = ({
    icon,
    tooltip,
    onClick,
    shortcut = [],
    disabled = false,
    ...props
}: ActionProps) => {
    const { addKeyHandler, removeKeyHandler } = useKeyHandler();

    const clickHandler = useCallback((): void => {
        if (typeof onClick === "function") {
            return onClick();
        }
    }, [onClick]);

    useEffect((): (() => void) => {
        shortcut.map(short => {
            addKeyHandler(short, e => {
                e.preventDefault();
                if (!onClick) {
                    return;
                }
                onClick();
            });
        });

        return () => {
            shortcut.map(short => {
                removeKeyHandler(short);
            });
        };
    }, [onClick]);

    return (
        <Tooltip placement={"bottom"} content={<span>{tooltip}</span>}>
            <IconButton
                disabled={disabled}
                icon={icon}
                onClick={clickHandler}
                data-testid={props["data-testid"]}
            />
        </Tooltip>
    );
};

export default Action;
