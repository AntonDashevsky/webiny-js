import * as React from "react";
import { makeDecoratable, withStaticProps } from "~/utils";
import type { IconButtonProps as IconButtonProps } from "~/Button";
import { IconButton } from "~/Button";
import { AccordionItemSeparator } from "./AccordionItemSeparator";

type AccordionItemActionProps = IconButtonProps;

const AccordionItemActionBase = ({ onClick, ...props }: AccordionItemActionProps) => {
    // We need to stop the event propagation to prevent the accordion from opening/closing when the action is clicked.
    const onClickCallback = React.useCallback(
        (e: React.MouseEvent<HTMLButtonElement>) => {
            e.stopPropagation();

            if (onClick) {
                onClick(e);
            }
        },
        [onClick]
    );

    return <IconButton variant={"ghost"} size={"sm"} {...props} onClick={onClickCallback} />;
};

const DecoratableAccordionItemAction = makeDecoratable(
    "AccordionItemAction",
    AccordionItemActionBase
);

const AccordionItemAction = withStaticProps(DecoratableAccordionItemAction, {
    Separator: AccordionItemSeparator
});

export { AccordionItemAction, type AccordionItemActionProps };
