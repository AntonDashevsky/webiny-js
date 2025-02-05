import * as React from "react";
import { useCallback } from "react";
import { makeDecoratable } from "~/utils";
import { Icon, IconProps as IconProps } from "~/Icon";
import { ReactComponent as DragHandleIcon } from "@material-design-icons/svg/filled/drag_indicator.svg";

interface AccordionItemHandleProps extends Omit<IconProps, "icon"> {
    icon?: React.ReactElement;
}

const AccordionItemHandleBase = ({ onClick, ...props }: AccordionItemHandleProps) => {
    // We need to stop the event propagation to prevent the accordion from opening/closing when the handle is clicked.
    const onClickCallback = useCallback(
        (e: React.MouseEvent<HTMLButtonElement>) => {
            e.stopPropagation();

            if (onClick) {
                onClick(e);
            }
        },
        [onClick]
    );

    return (
        <Icon
            size={"sm"}
            color={"neutral-light"}
            icon={<DragHandleIcon />}
            {...props}
            onClick={onClickCallback}
        />
    );
};

const AccordionItemHandle = makeDecoratable("AccordionItemHandle", AccordionItemHandleBase);

export { AccordionItemHandle, type AccordionItemHandleProps };
