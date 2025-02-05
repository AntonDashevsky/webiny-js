import * as React from "react";
import * as AccordionPrimitive from "@radix-ui/react-accordion";
import { ReactComponent as KeyboardArrowDownIcon } from "@material-design-icons/svg/outlined/keyboard_arrow_down.svg";
import { makeDecoratable } from "~/utils";
import { type AccordionItemProps } from "./AccordionItem";
import { AccordionItemAction } from "./AccordionItemAction";
import { Icon } from "@webiny/admin-ui";

type AccordionTriggerProps = Pick<
    AccordionItemProps,
    "title" | "description" | "icon" | "handle" | "actions"
>;

const AccordionTriggerBase = React.forwardRef<
    React.ElementRef<typeof AccordionPrimitive.Trigger>,
    AccordionTriggerProps
>(({ title, description, actions, icon, handle }, ref) => {
    const trigger = (
        <AccordionPrimitive.Trigger
            ref={ref}
            className={
                "wby-w-full wby-flex wby-justify-between wby-items-center wby-px-md wby-py-sm-extra wby-transition-all wby-cursor-pointer focus-visible:wby-outline-none focus-visible:wby-border-accent-default [&[data-state=open]_[data-role=open-close-indicator]]:wby-rotate-180"
            }
        >
            {icon && <div className={"wby-mr-md"}>{icon}</div>}
            <div className={"wby-flex wby-flex-col wby-gap-xxs wby-flex-grow wby-text-left"}>
                <div className={"wby-text-md wby-font-semibold"}>{title}</div>
                <div className={"wby-text-sm wby-text-neutral-strong"}>{description}</div>
            </div>
            <div className={"wby-flex wby-ml-3xl wby-gap-xs"}>
                {actions}

                {/* No need to show the separator if there are no actions. */}
                {actions && <AccordionItemAction.Separator />}

                <Icon
                    className={"wby-transition-all"}
                    data-role={"open-close-indicator"}
                    icon={<KeyboardArrowDownIcon />}
                />
            </div>
        </AccordionPrimitive.Trigger>
    );

    if (handle) {
        return (
            <div className={"wby-flex wby-items-center"}>
                <div>{handle}</div>
                {trigger}
            </div>
        );
    }

    return trigger;
});
AccordionTriggerBase.displayName = AccordionPrimitive.Trigger.displayName;

export const AccordionTrigger = makeDecoratable("AccordionTrigger", AccordionTriggerBase);
