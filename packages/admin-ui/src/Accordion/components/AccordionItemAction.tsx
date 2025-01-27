import * as React from "react";
import { makeDecoratable, withStaticProps } from "~/utils";
import { IconButton, IconButtonProps as IconButtonProps } from "~/Button";
import { AccordionItemSeparator } from "./AccordionItemSeparator";
import { useCallback } from "react";

interface AccordionItemActionProps extends IconButtonProps {
    onClickStopPropagation?: boolean;
}

const AccordionItemActionBase = ({
    onClick,
    onClickStopPropagation,
    ...props
}: AccordionItemActionProps) => {
    // We need to stop the event propagation to prevent the accordion from opening/closing when the action is clicked.
    const onClickCallback = useCallback(
        (e: React.MouseEvent<HTMLButtonElement>) => {
            if (onClickStopPropagation !== false) {
                e.stopPropagation();
            }

            if (onClick) {
                onClick(e);
            }
        },
        [onClick, onClickStopPropagation]
    );

    return <IconButton onClick={onClickCallback} variant={"ghost"} size={"sm"} {...props} />;
};

const DecoratableAccordionItemAction = makeDecoratable(
    "AccordionItemAction",
    AccordionItemActionBase
);

const AccordionItemAction = withStaticProps(DecoratableAccordionItemAction, {
    Separator: AccordionItemSeparator
});

export { AccordionItemAction, type AccordionItemActionProps };
